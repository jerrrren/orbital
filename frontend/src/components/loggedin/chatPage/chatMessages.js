import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const ChatMessages = (props) => {
  const messageboxes = props.messages.map((message) => (
    <Box
      style={{
        background: "#badefe",
        width: "80vw",
        minHeight: "10vh",
        minWidth: "80vw",
        maxWidth: "80vw",
        maxHeight: "10vh",
        borderRadius: "15px",
        marginRight: "0.5vw",
      }}
    >
      <Heading>{message.receiver}</Heading>
      <Text>{message.body}</Text>
    </Box>
  ));

  return (
    <Flex
      direction="column-reverse"
      minHeight="70vh"
      maxHeight="70vh"
      minWidth="83vw"
      maxWidth="83vw"
      alignItems="center"
      gap="1vh"
      overflowY="scroll"
    >
      {messageboxes}
    </Flex>
  );
};

export default ChatMessages;
