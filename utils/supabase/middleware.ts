import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 👇 Only redirect to sign-in if trying to access protected routes
    if (request.nextUrl.pathname.startsWith("/protected") && !user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // 👇 Redirect to protected dashboard if user is signed in and visiting home
    if (request.nextUrl.pathname === "/" && user) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return response;
  } catch (e) {
    console.error("Session middleware error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
