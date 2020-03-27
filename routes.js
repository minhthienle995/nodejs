module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    app.get('/login', function (req, res) {
        // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // Lấy thông tin user trong session và truyền nó qua template
        });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
        failureRedirect: '/signup', // trở lại trang đăng ký nếu có lỗi
        failureFlash: true // allow flash messages
    }));
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/');
}
// app/routes.js
// Xử lý thông tin khi có người thực hiện đăng nhập
app.post('/login', passport.authenticate("local-login", {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));
};