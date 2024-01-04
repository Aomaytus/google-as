import React from "react";
import { Checkbox, VStack, Text } from "@chakra-ui/react";

const LanguageCheckbox = ({ language, onChange }) => {
  return (
    <VStack spacing="4" align="start">
      <Text fontSize="lg">Choose Language:</Text>
      <Checkbox
        isChecked={language === "th-TH"}
        onChange={() => onChange("th-TH")}
      >
        ภาษาไทย
      </Checkbox>
      <Checkbox
        isChecked={language === "en-US"}
        onChange={() => onChange("en-US")}
      >
        English
      </Checkbox>
    </VStack>
  );
};

export default LanguageCheckbox;
// if (transcript == "เปิดปั๊มน้ำ") { console.log("เปิดปั๊มน้ำ"); }
// if (transcript == "ปิดปั๊มน้ำ") { console.log("ปิดปั๊มน้ำ"); }