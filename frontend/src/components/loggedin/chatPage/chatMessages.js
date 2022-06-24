import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const ChatMessages = (props) => {
  const messageboxes = props.messages
    ?.filter(
      (a) => (a.target == props.receiver.uid) | (a.senderId == props.receiver.uid)
    )
    .sort(
      (a, b) =>
        new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
    )
    .reverse()
    .map((message) => (
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
        <Heading>{message.senderId}</Heading>
        <Text>{message.message}</Text>
        <Text>{new Date(message.timeStamp).getTime()}</Text>
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
