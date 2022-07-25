import { Flex, Box, Text } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

const ChatMessages = (props) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messages]);

  var current_user = null;
  function mapToChat(message) {
    var user = props.receiver.username;
    if (current_user == message.senderId) {
      user = null;
    }
    current_user = message.senderId;

    if (message.senderId != props.receiver.uid) {
      return (
        <Box>
          <Flex
            style={{
              width: "80vw",
              direction: "rtl",
            }}
          >
            <Box
              style={{
                background: "#D1E8E2",
                borderRadius: "15px",
                marginRight: "0.5vw",
                padding: "1vw",
              }}
            >
              <Text style={{ whiteSpace: "break-spaces" ,direction:"ltr"}}>
                {message.message}
              </Text>
            </Box>
          </Flex>
        </Box>
      );
    }

    return (
      <Box>
        <Text fontSize={"xs"} color="#585858">
          {user}
        </Text>
        <Flex
          style={{
            width: "80vw",
          }}
        >
          <Box
            style={{
              background: "#F0FFFF",
              borderRadius: "15px",
              marginRight: "0.5vw",
              padding: "1vw",
            }}
          >
            <Text style={{ whiteSpace: "break-spaces" }}>
              {message.message}
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  }

  const messageboxes = props.messages
    ?.filter(
      (a) =>
        (a.target == props.receiver.uid) | (a.senderId == props.receiver.uid)
    )
    .sort(
      (a, b) =>
        new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
    )
    .map(mapToChat)
    .reverse();

  return (
    <Flex
      direction="column-reverse"
      height="77.6vh"
      width="83vw"
      alignItems="center"
      gap="1vh"
      overflowY="scroll"
    >
      <div ref={bottomRef} />
      {messageboxes}
    </Flex>
  );
};

export default ChatMessages;
