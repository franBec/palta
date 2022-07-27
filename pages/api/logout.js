import { withSessionRoute } from "../../lib/session";

export default withSessionRoute(logout);

async function logout(req, res){
  req.session.destroy();
  // res.redirect("/")
  return res.status(200).json({success:true})
};