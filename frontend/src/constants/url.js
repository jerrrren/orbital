const host = "http://localhost:8080";

export const url = {
  get_ws: "ws://localhost:8080/ws?id=",
  get_username: host + "/user_names/",
  get_messages: host + "/messages/",
  get_posts: host + "/posts/getPosts",
  add_post: host + "/posts/createpost",
  if_paired: host + "/pairing/ifPaired",
  fill_and_match: host + "/pairing/fillAndMatch",
  login: host + "/users/login",
  signup: host + "/users/signup",
  register_add: host + "/pairing/registerAdd",
  get_verification_status: host + "/email/checkverified",
  send_verification_email: host + "/email/sendverificationemail?id=",
  verify_email: host + "/email/verifyemail",
};

