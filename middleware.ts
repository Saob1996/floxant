import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware() {
        // middleware logic handled by NextAuth
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Only allow if user is authenticated
                return !!token
            },
        },
    }
)

export const config = {
    matcher: ["/dashboard/:path*"],
}
