import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalTypeaheadMenuPlugin } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { useCallback } from "react";

import { $createMentionNode } from "./MentionNode";
import { MenuItem, Stack, Typography, Popper, Paper } from "@mui/material";
import { CustomAvatar } from "components/custom-avatar";

const PUNCTUATION = "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";
const NAME = "\\b[A-Z][^\\s" + PUNCTUATION + "]";

const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION,
};

const PUNC = DocumentMentionsRegex.PUNCTUATION;

const TRIGGERS = ["@"].join("");

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = "[^" + TRIGGERS + PUNC + "\\s]";

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS =
  "(?:" +
  "\\.[ |$]|" + // E.g. "r. " in "Mr. Smith"
  " |" + // E.g. " " in "Josh Duck"
  "[" +
  PUNC +
  "]|" + // E.g. "-' in "Salier-Hellendag"
  ")";

const LENGTH_LIMIT = 75;

const AtSignMentionsRegex = new RegExp(
  "(^|\\s|\\()(" + "[" + TRIGGERS + "]" + "((?:" + VALID_CHARS + VALID_JOINS + "){0," + LENGTH_LIMIT + "})" + ")$"
);

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp(
  "(^|\\s|\\()(" + "[" + TRIGGERS + "]" + "((?:" + VALID_CHARS + "){0," + ALIAS_LENGTH_LIMIT + "})" + ")$"
);

function checkForAtSignMentions(text, minMatchLength) {
  let match = AtSignMentionsRegex.exec(text);

  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[3];
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      };
    }
  }
  return null;
}

function getPossibleQueryMatch(text) {
  const match = checkForAtSignMentions(text, 1);
  return match;
}

export default function MentionsPlugin({ options, onQueryChange }) {
  const [editor] = useLexicalComposerContext();

  const onSelectOption = useCallback(
    (selectedOption, nodeToReplace, closeMenu) => {
      editor.update(() => {
        const mentionNode = $createMentionNode(selectedOption);
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode);
        }
        mentionNode.select();
        closeMenu();
      });
    },
    [editor]
  );

  const checkForMentionMatch = useCallback((text) => {
    const mentionMatch = getPossibleQueryMatch(text);
    return mentionMatch || null;
  }, []);

  return (
    <>
      <LexicalTypeaheadMenuPlugin
        onQueryChange={(q) => onQueryChange && onQueryChange(q)}
        onSelectOption={onSelectOption}
        triggerFn={checkForMentionMatch}
        options={options}
        menuRenderFn={(anchorElementRef, { selectOptionAndCleanUp, setHighlightedIndex }) => {
          if (anchorElementRef.current && options.length > 0)
            return (
              <Popper
                open={Boolean(anchorElementRef.current)}
                anchorEl={anchorElementRef.current}
                disabledArrow
                placement="bottom-start"
                sx={{ minWidth: "200px" }}
              >
                <Paper elevation={2} sx={{ p: 1 }}>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setHighlightedIndex(index);
                        selectOptionAndCleanUp(option);
                      }}
                      sx={{ borderRadius: 0.75 }}
                      onMouseEnter={() => {
                        setHighlightedIndex(index);
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CustomAvatar name={option.name} sx={{ height: 30, width: 30, fontSize: "10px" }} />
                        <Typography variant="body2"> {option.name}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Paper>
              </Popper>
            );
          return null;
        }}
      />
    </>
  );
}
