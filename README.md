Main.js- I mainly use it for making routes. I use Outlet to make children of the header. Header has a navBar, so making outlet, I made it accessible from all pages.

Header.js- It consists of navBar, which can be accessed from all pages. To navigate these pages, it has three options (Dashboard, Login, Appoint Task). It has a toggle button between sign-out and login sign-in. If you are signed in, it will show a signout button; otherwise, it will show login and sign-in button.

Login.js & Signup.js- it is for user authentication. I use Firebase email login authentication. If you are a new user, you will navigate to the signup page by clicking the sign-up button. I also use a toast from(react-hot-toast) to give the notification that he/she is logged in or the password is wrong. After logging in, you will automatically navigate to the Dashboard page.

Dashboard.js- It is a protected route. If you are logged in, then only can go to this page. In the dashboard, you can see a table, which is sortable. The table has the task information. And each row has two buttons, View and Mark as Done. You can see the details task data on the View.js page by clicking view. And Delete or remove the task by clicking Mark as Done button. 

View.js- On this page, you can see the detailed information for that particular data. 

Task.js- it is also a protected route. On this page, you can assign a task to a particular employee. After giving the task information, the form will reset and provide the user a toast.success. 

PrivetRoutes.js & Router.js- It is mainly for routing the whole site. Privet routes make for protecting the site. 

AuthProvider.js- In this part, I make context to find data by destructuring the data from desired pages. CreateUser, Login, and Logout methods are also written on this page.

This site is responsive. Users can view this site from any device. 
