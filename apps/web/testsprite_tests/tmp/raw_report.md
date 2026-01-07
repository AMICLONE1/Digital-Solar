
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** PowerNetPro-Digital-Solar
- **Date:** 2026-01-07
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** User Signup Success
- **Test Code:** [TC001_User_Signup_Success.py](./TC001_User_Signup_Success.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/c330bbfb-0944-4505-818a-b466822a965c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** User Signup with Existing Email
- **Test Code:** [TC002_User_Signup_with_Existing_Email.py](./TC002_User_Signup_with_Existing_Email.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/e39a0e6f-6b29-4758-8994-1361a16f2a31
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** Login Success
- **Test Code:** [TC003_Login_Success.py](./TC003_Login_Success.py)
- **Test Error:** Login test completed. Login with valid credentials was not successful as the page remained on the login form with no indication of successful login or redirection to dashboard or onboarding. No error messages were shown either. Please investigate the login functionality.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0983700AC070000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x7ac08bc4680]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x7ac08bc4680]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x7ac08bc4680]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x7ac08bc4680]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/a5d1a7d0-9e3d-4915-84d9-fed40d6de3e5
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** Login Failure with Incorrect Password
- **Test Code:** [TC004_Login_Failure_with_Incorrect_Password.py](./TC004_Login_Failure_with_Incorrect_Password.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/5ea42d01-eae5-48cd-90b5-0836a98285d3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** Password Reset Request
- **Test Code:** [TC005_Password_Reset_Request.py](./TC005_Password_Reset_Request.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/bc41784a-1e4e-4154-a766-915a9c14df37
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** Password Reset with Valid Token
- **Test Code:** [TC006_Password_Reset_with_Valid_Token.py](./TC006_Password_Reset_with_Valid_Token.py)
- **Test Error:** The password reset flow was tested starting from requesting a reset link for the email 'omkarkolhe912@gmail.com'. However, the reset token 'validtoken123' used to access the reset password page was invalid, resulting in repeated 'Invalid reset link' error messages. Consequently, the password could not be reset successfully. The system correctly prevents password reset with an invalid token and shows appropriate error messages. The task to verify successful password reset with a valid token could not be completed due to lack of a valid reset token link.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0843B0044050000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x54404ccae80]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x54404ccae80]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x54404ccae80]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x54404ccae80]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] Failed to fetch RSC payload for http://localhost:3000/. Falling back to browser navigation. TypeError: Failed to fetch
    at fetchServerResponse (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js:59:27)
    at fastRefreshReducerImpl (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/router-reducer/reducers/fast-refresh-reducer.js:33:67)
    at clientReducer (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/router-reducer/router-reducer.js:41:67)
    at Object.action (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/shared/lib/router/action-queue.js:150:55)
    at runAction (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/shared/lib/router/action-queue.js:56:38)
    at dispatchAction (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/shared/lib/router/action-queue.js:113:9)
    at Object.dispatch (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/shared/lib/router/action-queue.js:145:40)
    at eval (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/use-reducer-with-devtools.js:130:21)
    at eval (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/app-router.js:304:25)
    at startTransition (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/compiled/react/cjs/react.development.js:2597:25)
    at Object.fastRefresh (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/app-router.js:303:48)
    at eval (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:277:28)
    at startTransition (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/compiled/react/cjs/react.development.js:2597:25)
    at processMessage (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:276:44)
    at WebSocket.handler (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:395:17) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.%s 
    at ResetPasswordPage (webpack-internal:///(app-pages-browser)/./app/reset-password/page.tsx:30:78)
    at ClientPageRoot (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/client-page.js:14:11)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:370:11)
    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:243:11)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at LoadingBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:349:11)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/error-boundary.js:160:11)
    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:153:9)
    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:228:11)
    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/render-from-template-context.js:16:44)
    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/layout-router.js:370:11)
    at MonitoringProvider (webpack-internal:///(app-pages-browser)/./components/providers/MonitoringProvider.tsx:19:11)
    at body
    at html
    at RootLayout (Server)
    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/redirect-boundary.js:74:9)
    at RedirectBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/redirect-boundary.js:82:11)
    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/not-found-boundary.js:76:9)
    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/not-found-boundary.js:84:11)
    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)
    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)
    at HotReload (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:321:11)
    at Router (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/app-router.js:207:11)
    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/error-boundary.js:113:9)
    at ErrorBoundary (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/error-boundary.js:160:11)
    at AppRouter (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/components/app-router.js:585:13)
    at ServerRoot (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:112:27)
    at Root (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:117:11) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/recover?redirect_to=http%3A%2F%2Flocalhost%3A3000%2Freset-password:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/9122c642-827e-427e-9426-02da57798551
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** Landing Page Load Performance
- **Test Code:** [TC007_Landing_Page_Load_Performance.py](./TC007_Landing_Page_Load_Performance.py)
- **Test Error:** The landing page loaded successfully and its content was verified. However, attempts to log in with the provided credentials repeatedly failed due to validation errors on the email and password fields, preventing progression to the dashboard or further pages. Consequently, it was not possible to measure the page load time under 2 seconds or obtain Lighthouse performance scores of 90+ for desktop and mobile. The task is incomplete due to these login issues.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0D83B009C080000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x89c016a5b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x89c016a5b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x89c016a5b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x89c016a5b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0AC3B009C080000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/33e168d3-e42d-4d87-842f-f9a81ed298a3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** User Onboarding Success Flow
- **Test Code:** [TC008_User_Onboarding_Success_Flow.py](./TC008_User_Onboarding_Success_Flow.py)
- **Test Error:** User is unable to complete the onboarding flow due to repeated login failures. Password reset link was sent but login attempts still fail with empty email input field and no error messages. Onboarding flow cannot proceed further without successful login. Test stopped at step 14 out of 15.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0183B0074020000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x2740660c880]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2740660c880]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2740660c880]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2740660c880]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/d28c5e2c-0f39-40dc-8e3e-2da0a8079fb1
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** KYC Verification Failure with Invalid Data
- **Test Code:** [TC009_KYC_Verification_Failure_with_Invalid_Data.py](./TC009_KYC_Verification_Failure_with_Invalid_Data.py)
- **Test Error:** The task to verify KYC verification failure with invalid Aadhaar or PAN details could not be fully completed because login attempts with the provided credentials failed repeatedly due to validation errors and rate limiting. Password reset was attempted but did not resolve the login issue. Without successful login, access to the onboarding KYC form was not possible, so the KYC form submission with invalid details and verification of failure could not be tested.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0983A00B42E0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2eb401b8cf00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x2eb401b8cf00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2eb401b8cf00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2eb401b8cf00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] Login error: AuthApiError: Request rate limit reached
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signInWithPassword (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:444:23)
    at async handleLogin (webpack-internal:///(app-pages-browser)/./app/login/page.tsx:70:48) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/ea6e4e38-1710-406d-9016-3d16a8bffa92
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** Project Capacity Reservation Limits
- **Test Code:** [TC010_Project_Capacity_Reservation_Limits.py](./TC010_Project_Capacity_Reservation_Limits.py)
- **Test Error:** Unable to proceed with the task because the login attempts are blocked by a 'Request rate limit reached' error. This prevents authentication and access to the project reservation page where solar capacity reservation limits can be tested. Task is stopped as per instructions.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0043C00A4120000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x12a4044ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x12a4044ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x12a4044ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x12a4044ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] Login error: AuthApiError: Request rate limit reached
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signInWithPassword (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:444:23)
    at async handleLogin (webpack-internal:///(app-pages-browser)/./app/login/page.tsx:70:48) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2Flocalhost%3A3000%2Fdashboard:0:0)
[ERROR] Signup error: AuthApiError: User already registered
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signUp (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:379:23)
    at async handleSignup (webpack-internal:///(app-pages-browser)/./app/signup/page.tsx:87:60) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] Login error: AuthApiError: Request rate limit reached
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signInWithPassword (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:444:23)
    at async handleLogin (webpack-internal:///(app-pages-browser)/./app/login/page.tsx:70:48) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/d835e16c-a8ff-4af5-b154-61cee496a2df
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011
- **Test Name:** Payment Processing via Razorpay
- **Test Code:** [TC011_Payment_Processing_via_Razorpay.py](./TC011_Payment_Processing_via_Razorpay.py)
- **Test Error:** The task to verify successful payment processing, order creation, and webhook handling with Razorpay could not be completed because the user was unable to log in. Multiple login attempts failed due to the email input field being empty and highlighted in red, indicating a validation error. No successful authentication or navigation to the dashboard occurred, so payment initiation and subsequent steps could not be tested.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A01843002C2F0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2f2c08f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2f2c08f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2f2c08f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2f2c08f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/d4044839-3760-4ea2-a56b-2b6740139736
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012
- **Test Name:** Credit Calculation Engine Accuracy
- **Test Code:** [TC012_Credit_Calculation_Engine_Accuracy.py](./TC012_Credit_Calculation_Engine_Accuracy.py)
- **Test Error:** The task to verify that the credit calculation engine generates accurate, audited credit entries could not be fully completed because login attempts with the provided credentials failed repeatedly. Password reset was initiated but no successful login was achieved to access the dashboard or credit calculation engine features. Therefore, assertions regarding credit calculations, credit ledger entries, and manual credit overrides could not be performed. Further investigation or correct credentials are needed to proceed.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0EC3A006C2D0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2d6c08996180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2d6c08996180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2d6c08996180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2d6c08996180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/recover?redirect_to=http%3A%2F%2Flocalhost%3A3000%2Freset-password:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/a12ce494-b2b4-4663-8b2c-310d29d3fc5c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013
- **Test Name:** Monthly Bill Fetching and Display
- **Test Code:** [TC013_Monthly_Bill_Fetching_and_Display.py](./TC013_Monthly_Bill_Fetching_and_Display.py)
- **Test Error:** The task to verify monthly bills auto-fetch via BBPS API and display on dashboard could not be completed because the login step failed repeatedly. The email and password inputs were not accepted or retained, preventing successful authentication and access to the dashboard. Hence, verification of bill fetching and display could not be performed.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0044300E4360000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x36e409792180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x36e409792180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x36e409792180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x36e409792180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/7e9636d4-cf35-4286-90b5-6697f58a55af
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014
- **Test Name:** Bill Payment Using Credits
- **Test Code:** [TC014_Bill_Payment_Using_Credits.py](./TC014_Bill_Payment_Using_Credits.py)
- **Test Error:** The task to verify bill payment with credits could not be completed because the user was unable to successfully log in despite multiple attempts with the provided credentials. The login page repeatedly showed validation errors on the email field and cleared inputs, preventing access to the dashboard and further steps. Hence, the verification of automatic and manual credit application for bill payment could not be performed.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0983C00D40C0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xcd40cde1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xcd40cde1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xcd40cde1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xcd40cde1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/f81c316c-fed4-475a-a203-00c6c64a3d23
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015
- **Test Name:** User Dashboard Data Real-time Update
- **Test Code:** [TC015_User_Dashboard_Data_Real_time_Update.py](./TC015_User_Dashboard_Data_Real_time_Update.py)
- **Test Error:** The task to verify the dashboard showing real-time savings summaries, graphs, and notifications with data refresh could not be completed because login attempts failed repeatedly due to an email validation error on the login page. The email input field was cleared or invalidated after input, preventing successful form submission and access to the dashboard. Therefore, the dashboard content and real-time data refresh could not be verified.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0444B00743B0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x3b7409425480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x3b7409425480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x3b7409425480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x3b7409425480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/b47c9e59-2fb6-489d-bd52-5804b4d3527e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016
- **Test Name:** Referral Reward Flow
- **Test Code:** [TC016_Referral_Reward_Flow.py](./TC016_Referral_Reward_Flow.py)
- **Test Error:** Tested new user signup with referral code but login failed due to form resetting and clearing inputs after clicking Sign In. Unable to complete onboarding and verify referral reward. Reporting this issue and stopping further testing.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0D83C009C2B0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2b9c0a2a6180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2b9c0a2a6180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2b9c0a2a6180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2b9c0a2a6180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] Login error: AuthApiError: Request rate limit reached
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signInWithPassword (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:444:23)
    at async handleLogin (webpack-internal:///(app-pages-browser)/./app/login/page.tsx:70:48) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/d9fabf55-79a5-4017-ac2f-a7f0146c0e9e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017
- **Test Name:** Notification Delivery and Handling
- **Test Code:** [TC017_Notification_Delivery_and_Handling.py](./TC017_Notification_Delivery_and_Handling.py)
- **Test Error:** The task to verify real-time notifications for credits, payments, and system alerts could not be completed because the login process failed repeatedly due to email input validation errors. Without successful authentication, it was not possible to access the dashboard or notification center to trigger and verify notifications. Therefore, the task is incomplete.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0843C00A4220000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x22a406179480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x22a406179480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x22a406179480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x22a406179480]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/5377826a-5d8a-4e71-8929-9c1a52f49113
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018
- **Test Name:** Export Savings and Analytics Report
- **Test Code:** [TC018_Export_Savings_and_Analytics_Report.py](./TC018_Export_Savings_and_Analytics_Report.py)
- **Test Error:** The user was unable to successfully log in despite multiple attempts with the provided credentials. The login form resets after each attempt without showing error messages, preventing access to the dashboard. Consequently, the export functionality for savings and analytics data could not be tested. The task is incomplete due to authentication failure.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0AC3B0024320000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x32240a4e0200]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x32240a4e0200]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x32240a4e0200]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x32240a4e0200]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/6fb74ea3-4f10-4668-8791-474468f78450
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019
- **Test Name:** Security - AES-256 Encryption and CSRF Token Validation
- **Test Code:** [TC019_Security___AES_256_Encryption_and_CSRF_Token_Validation.py](./TC019_Security___AES_256_Encryption_and_CSRF_Token_Validation.py)
- **Test Error:** The task to verify sensitive data encryption with AES-256 and CSRF token validation could not be fully completed because the login form could not be successfully submitted despite multiple attempts. The email field remained empty or invalid, blocking authentication and preventing access to subsequent forms for testing. Therefore, encryption and CSRF token enforcement could not be verified. Task ended with partial failure.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0583B002C000000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2c0862e800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2c0862e800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x2c0862e800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x2c0862e800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/f7ffcb9d-6e4e-4a5d-af3f-9b8c11c846bc
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020
- **Test Name:** API Rate Limiting Enforcement
- **Test Code:** [TC020_API_Rate_Limiting_Enforcement.py](./TC020_API_Rate_Limiting_Enforcement.py)
- **Test Error:** The task to verify API rate limiting was partially completed. I successfully navigated to the login page and attempted to perform rapid successive login attempts to trigger rate limiting. However, repeated UI interaction errors prevented multiple rapid submissions of the login form. Due to these constraints, I could not fully verify if the server responds with HTTP 429 errors upon rate limit exceeded. Further testing via direct API calls or backend logs is recommended to conclusively verify rate limiting enforcement.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0043B002C090000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x92c09dcdb00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x92c09dcdb00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x92c09dcdb00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x92c09dcdb00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/693bdb5e-778c-4d0a-a8eb-1b1480bbf6e7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021
- **Test Name:** XSS Protection in User Inputs
- **Test Code:** [TC021_XSS_Protection_in_User_Inputs.py](./TC021_XSS_Protection_in_User_Inputs.py)
- **Test Error:** Input sanitization testing on login and signup forms completed successfully. However, navigation to reserve solar and utility connection pages failed, preventing further testing. Website navigation issue reported. Task stopped.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0583A00240E0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xe2408fce180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xe2408fce180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xe2408fce180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0xe2408fce180]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/5444625a-9b2e-48ac-b8f2-8bb65cdc4436
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022
- **Test Name:** Role-Based Access Control Enforcement
- **Test Code:** [TC022_Role_Based_Access_Control_Enforcement.py](./TC022_Role_Based_Access_Control_Enforcement.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/8bb93d47-6ab4-4834-ba10-cf3f613916e7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023
- **Test Name:** API Health Check Endpoint Functional
- **Test Code:** [TC023_API_Health_Check_Endpoint_Functional.py](./TC023_API_Health_Check_Endpoint_Functional.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/927db8cd-10c1-454a-add6-33ba2820928f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC024
- **Test Name:** PWA Offline Capabilities
- **Test Code:** [TC024_PWA_Offline_Capabilities.py](./TC024_PWA_Offline_Capabilities.py)
- **Test Error:** The Progressive Web App (PWA) landing page loaded successfully and the app shell appears to be cached by the service worker, indicating offline capability for the unauthenticated landing page. However, repeated login attempts with the provided credentials failed, with the login form resetting without error messages. Due to this, the authenticated user workflow (signup, login, reserve solar, connect utility, dashboard) could not be tested offline. Therefore, full verification of offline functionality for the complete user journey was not possible. The PWA does show expected offline caching behavior on the landing page, but authentication and subsequent user flows require resolution of login issues to fully verify offline support. Task is marked as incomplete due to these limitations.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0D83A004C0D0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xd4c0839db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xd4c0839db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0xd4c0839db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xd4c0839db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/64179189-1707-4559-a670-339ee0cf58df
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC025
- **Test Name:** User Session Management and Logout
- **Test Code:** [TC025_User_Session_Management_and_Logout.py](./TC025_User_Session_Management_and_Logout.py)
- **Test Error:** The task to verify user sessions with timeout and logout functionality could not be fully completed. Multiple login attempts with the provided valid credentials failed because the email input field was repeatedly cleared or showed validation errors, preventing successful login. Without successful login, it was not possible to test session timeout by staying idle or to test logout functionality via the UI. Further investigation or fixing of the login form behavior is needed to proceed with session management testing.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0C43A00D40A0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xad4097b1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xad4097b1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0xad4097b1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xad4097b1b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/e63f2870-f073-4985-b5da-400c0a74b04b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC026
- **Test Name:** Referral Code Generation and Validation
- **Test Code:** [TC026_Referral_Code_Generation_and_Validation.py](./TC026_Referral_Code_Generation_and_Validation.py)
- **Test Error:** The task to verify generation of referral codes and validation during new user signup could not be fully completed. Login attempts with the provided user were blocked due to request rate limiting, preventing access to the user dashboard to generate referral codes. Attempts to create a new user for referral code testing failed due to the email already being registered. Therefore, referral code generation and validation during signup could not be verified. Further testing requires resolving login rate limiting or using a different user account. Task incomplete.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0583B00AC0D0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xdac0a741b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0xdac0a741b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xdac0a741b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0xdac0a741b00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] Login error: AuthApiError: Request rate limit reached
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signInWithPassword (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:444:23)
    at async handleLogin (webpack-internal:///(app-pages-browser)/./app/login/page.tsx:70:48) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] Failed to load resource: the server responded with a status of 422 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/signup?redirect_to=http%3A%2F%2Flocalhost%3A3000%2Fdashboard:0:0)
[ERROR] Signup error: AuthApiError: User already registered
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signUp (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:379:23)
    at async handleSignup (webpack-internal:///(app-pages-browser)/./app/signup/page.tsx:87:60) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/977c1e38-a2a0-41f7-a3a6-9022e0857cf8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC027
- **Test Name:** Data Export Security and Accuracy
- **Test Code:** [TC027_Data_Export_Security_and_Accuracy.py](./TC027_Data_Export_Security_and_Accuracy.py)
- **Test Error:** The task to verify that only authorized users can export data and that exported files contain accurate data could not be completed because the user authentication step failed. The login page repeatedly showed an email input validation error, preventing successful login with the provided credentials. Without successful authentication, it was not possible to test export permissions or data accuracy in exported files. Hence, the task is incomplete.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A06C3A00FC230000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x23fc0a7ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x23fc0a7ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x23fc0a7ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x23fc0a7ca800]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/c6160457-47c2-4a72-817e-9f9754ea68e5
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC028
- **Test Name:** System Uptime and Error Rate Monitoring
- **Test Code:** [TC028_System_Uptime_and_Error_Rate_Monitoring.py](./TC028_System_Uptime_and_Error_Rate_Monitoring.py)
- **Test Error:** The task to verify the monitoring system's uptime and error rates could not be completed because login attempts were blocked due to 'Request rate limit reached' and invalid email input errors. Without successful login, access to the dashboard to simulate conditions and verify uptime ≥ 99.9% and error rates ≤ 0.1% was not possible. Task ended with failure to complete verification.
Browser Console Logs:
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0C43A00DC1F0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1fdc033e5c00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1fdc033e5c00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1fdc033e5c00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1fdc033e5c00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] Failed to load resource: the server responded with a status of 429 () (at https://kmwinrwqavqvclnevyxp.supabase.co/auth/v1/token?grant_type=password:0:0)
[ERROR] Login error: AuthApiError: Request rate limit reached
    at handleError (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:71:11)
    at async _handleRequest (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:114:9)
    at async _request (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/lib/fetch.js:96:18)
    at async SupabaseAuthClient.signInWithPassword (webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/@supabase+auth-js@2.89.0/node_modules/@supabase/auth-js/dist/module/GoTrueClient.js:444:23)
    at async handleLogin (webpack-internal:///(app-pages-browser)/./app/login/page.tsx:70:48) (at webpack-internal:///(app-pages-browser)/../../node_modules/.pnpm/next@14.2.35_@babel+core@7._03a221b03d8752f52975d146eb3980da/node_modules/next/dist/client/app-index.js:32:21)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/2a0b0fcf-4fa4-4f74-8f95-75fa7b8177e7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC029
- **Test Name:** API Response Time Validation
- **Test Code:** [TC029_API_Response_Time_Validation.py](./TC029_API_Response_Time_Validation.py)
- **Test Error:** The task to verify that all APIs respond within 200ms at 95th percentile under normal load could not be completed because the user login step failed repeatedly. The login form kept resetting with empty email and password fields, and the email input field was highlighted in red indicating a validation error. No error messages or alerts were shown to explain the failure. Without successful login, the subsequent user workflow steps and API response time measurements could not be performed. Hence, the task is incomplete.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0D83B00BC300000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x30bc0be2db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x30bc0be2db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x30bc0be2db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x30bc0be2db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/d2c48237-6d8d-42be-9c99-82e010b23b35
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC030
- **Test Name:** Audit Logging of User Activities
- **Test Code:** [TC030_Audit_Logging_of_User_Activities.py](./TC030_Audit_Logging_of_User_Activities.py)
- **Test Error:** The task to verify user activities including logins, payments, overrides, and data changes is incomplete. Despite multiple attempts, login with the provided credentials failed repeatedly, and no audit log entries were found for any user activities. Therefore, the verification of correct logging could not be performed. Further investigation into login issues and audit log generation is recommended.
Browser Console Logs:
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A06C3A00941D0000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1d9407f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[WARNING] [.WebGL-0x1d9407f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1d9407f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (at http://localhost:3000/:0:0)
[WARNING] [.WebGL-0x1d9407f9db00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels (this message will no longer repeat) (at http://localhost:3000/:0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
[ERROR] The script resource is behind a redirect, which is disallowed. (at :0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/aa1dbc9c-8918-457c-916a-fadc5cd8ef60/6a7f2d55-b16e-46f1-b01b-09e32f59b0c1
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **20.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---