import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const ironOptions = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: (4*24*60*60),
    //expire: hoy.toISOString(),
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, ironOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, ironOptions);
}