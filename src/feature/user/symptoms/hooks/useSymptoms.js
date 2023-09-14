import { useEffect, useState } from "react";
import * as symptomApi from "@api/symptoms";
import values from "lodash/values";
import merge from "lodash/merge";
import keyBy from "lodash/keyBy";
import { useUser } from "feature/auth/context";

export const useSymptoms = (activeTab) => {
  const [loading, setLoading] = useState(true);
  const [symptoms, setSymptoms] = useState({});
  const [causes, setCauses] = useState({});
  const user = useUser();

  useEffect(() => {
    const getTab0 = async () => {
      setLoading(true);

      const [symptomsResponse, userSymptomsResponse] = await Promise.all([
        symptomApi.getSymptoms(),
        symptomApi.getAllUserSymptoms(user?.id),
      ]);

      const formattedSymptoms = symptomsResponse.data?.map((symptom) => ({
        name: symptom.name,
        type: symptom.type,
        symptomId: symptom.id,
        value: {
          left: 0,
          right: 0,
          value: 0,
        },
      }));
      const formattedUserSymptoms = userSymptomsResponse.data?.map((userSymptom) => ({
        id: userSymptom.id,
        symptomId: userSymptom.symptom?.id,
        value: userSymptom.value,
      }));

      const userSymptoms = values(
        merge(keyBy(formattedSymptoms, "symptomId"), keyBy(formattedUserSymptoms, "symptomId"))
      );
      setSymptoms({ userSymptoms });
      setLoading(false);
    };

    const getTab1 = async () => {
      setLoading(true);
      const userSymptomsResponse = await symptomApi.getSelectedUserSymptoms(user?.id);

      const formattedSymptoms = userSymptomsResponse.data?.map((userSymptom) => ({
        symptomName: userSymptom.symptom.name,
        causes: userSymptom.causes,
        id: userSymptom.id,
      }));
      setCauses({ userSymptoms: formattedSymptoms });
      setLoading(false);
    };

    if (activeTab === 0) getTab0();
    if (activeTab === 1) getTab1();
  }, [activeTab]);

  return { loading, symptoms, causes };
};
