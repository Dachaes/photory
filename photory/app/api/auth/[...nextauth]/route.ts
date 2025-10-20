import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    // 이메일과 패스워드 방식으로 사용자가 직접 DB 부분을 컨트롤할 수 있음
    CredentialsProvider({
      name: "Credentials",

      // 로그인 form 내용
      credentials: {
        username: { label: "이메일", type: "text", placeholder: "이메일 입력" },
        password: { label: "비밀번호", type: "password" },
      },

      // 이메일, 패스워드 부분을 체크해서
      // 맞으면 user 객체 리턴
      // 틀리면 null 리턴
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };