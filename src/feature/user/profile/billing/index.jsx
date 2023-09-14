import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Content } from "./styled";
import Typography from "@mui/material/Typography";
import Button from "components/Button";
import { useUser } from "feature/auth/context";
import * as userApi from "@api/user";

const Billing = () => {
    const [daysLeft, setDaysLeft] = useState(0);
    const user = useUser();

    useEffect(() => {
        setDaysLeft(userApi.getDaysLeft(user));
    }, []);

    return (
        <Paper elevation={3}>
            <Content>
                <Typography>
                    Current Plan: Free Trial
                </Typography>
                <Typography sx={{marginTop: "2rem"}}>
                    Period: { ((21 - daysLeft) > 0) ? (21 - daysLeft) : "0" } days left!
                </Typography>
                <Typography sx={{marginTop: "2rem"}}>
                    Please Subscribe <Button href="https://www.silencetinnitusnow.com/tinnitus-pal">Here</Button>
                </Typography>
            </Content>
        </Paper>
    );
}

export default Billing;