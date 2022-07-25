import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../../constants/url";
import LoggedinNavbar from "../navigation/nav";
import { Heading, Text, Box, Flex, Button ,Link} from "@chakra-ui/react";
import useAuth from "../../../hooks/useAuth";

const Contents = () => {
  const { pid } = useParams();
  const [res, setresp] = useState(null);
  const id = parseInt(useAuth((state) => state.uid));

  const add_participant = () => {
    axios
      .patch(url.update_participants + pid, {
        uid: id,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(url.get_post + pid)
      .then((resp) => {
        console.log(resp.data);
        setresp(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const participants = res
    ? res.ParticipantsUsername?.map((participant) => (
        <Box>
          <Link
            padding="1"
            href={"/chat/" + participant.uid}
            children={<Button>{participant.username}</Button>}
          ></Link>
        </Box>
      ))
    : null;

  return (
    <div>
      <LoggedinNavbar />
      <Flex
        minWidth="40vw"
        background="orange"
        height="94.2vh"
        justifyContent="center"
      >
        <Box
          minWidth="40vw"
          background="white"
          margin="5"
          borderRadius="15px"
          padding="10"
        >
          <Box background={"#cccbcb"} rounded="15px" padding="2">
            <Heading style={{ fontFamily: "Dosis" }} padding="1">
              {res ? res.Field : null}
            </Heading>
            <Flex alignItems={"center"} padding="1">
              <Text style={{ fontFamily: "Dosis" }}>Created By:</Text>
              <Link
                href={"/chat/" + (res ? res.UID : null)}
                padding="1"
                fontSize={"2xl"}
              >
                <Button>{res ? res.Name : null}</Button>
              </Link>
            </Flex>
            <Text
              style={{
                fontFamily: "Dosis",
                fontWeight: "400",
                whiteSpace: "break-spaces",
              }}
              padding="1"
              fontSize={"2xl"}
            >
              {res ? res.Content : null}
            </Text>
          </Box>
          <Text
            padding="1"
            style={{ fontFamily: "Dosis", fontWeight: "400" }}
            fontSize={"xl"}
          >
            Participants:
          </Text>
          <Flex alignItems="center" wrap="wrap">
            {participants}
          </Flex>

          {res &&
            !(res.UID == id) &&
            res.Participants &&
            !res.Participants.includes(id) &&
            res.Participants.length < res.NumParticipants && (
              <Button onClick={add_participant}>Join Project</Button>
            )}
        </Box>
      </Flex>
    </div>
  );
};

export default Contents;
