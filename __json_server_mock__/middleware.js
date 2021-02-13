module.exports = (request, response, next) => {
  if (request.method === "POST" && request.path === "/login") {
    if (request.body.username === "jack" && request.body.password === "123123") {
      return response.status(200).json({
        user: {
          token: "123"
        }
      });
    } else {
      return response.status(400).json({message:"用户名或者密码错误"})
    }
  }
  next()
};
