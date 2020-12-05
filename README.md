# PROJECT: Blog API with Nodejs

This project will be a great way to practice and see the benefits of creating an API only backend.

One backend consumed by two different front-ends for accessing and editing the blog posts. One of the front-end sites for people that want to read and comment on posts while the other one will be just for user to write, edit and publish posts.

## Live Demo

[Live Demo Link]() .

![Design of the app models](modelDesign.png)


## Built With

- MongoDB.
- Express.js.
- React.js.
- Node.
- mongoose.
- Passport.js.
- bcrypt.js.
- Npm.
- Html.
- CSS.
- Bulma.
- Text editor TinyMCE

## Features:

- This is blog for one person.
- User could login using email and password.
- Authentication.
- It includes all of the CRUD methods for posts, so user Create, Read, Update or Delete his own posts.
- Blog visiors could Read and Comment on posts.
- Posts has the published/unpublished feature.

## Security

- Json Web Token (JWT) authentication.
- Using NODE_ENV to hide important variables and stack traces in error pages.
- Protected from Cross site request forgery(csrf) using CSURF npm package.
- Protected from Cross site scripting(xss) and injection by validating and sanitization the data.
- Passwords are secured with bcrypt.js.
- Cookies used for http only (not allowed for browser JavaScript).
- Cookies are destroyed after logout(ephemeral cookies).
- protected from DoS attacks by using the Rate limiting. The rate of requests that the server can receive from a specific user and / or IP address is controled.
- Set various HTTP headers, change default headers values or hide others by using Helmet.

## Testing
- Routes are tested with Curl and Postman.

## Future features
- Add beautiful langing page.  

### Prerequisites

1. Git.
2. Code editor.
3. browser.
4. Node.

## How to run the program

### On your local machine:

1. Open your terminal.

2. Enter `git clone https://github.com/othman-19/Blog_API_Node.git`.

3. Navigate to the cloned repository.

4. In the terminal cd into Blog_API_Node.

5. Run `npm install` in your terminal.

6. Run `npm run serverstart` or `DEBUG=Blog_API_Node:* npm run devstart` in your terminal.

7. In your browser try this url: `http://localhost:3000/`.

8. Try subscribe, create posts, comment posts.


## Author(s)
[Othmane Namani](https://github.com/othman-19/).  
[Email: othmanenaamani@gmail.com](mailto:othmanenaamani@gmail.com).  
[Portfolio](https://othman-19.github.io/my_portfolio/).  
[LinkedIn](https://www.linkedin.com/in/othman-namani/).  
[twitter](https://twitter.com/ONaamani).  
[DEV Community](https://dev.to/othman).  
[Angel List](https://angel.co/othmane-namani).  

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!


