function Login() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <input type="email" placeholder="Nhập email" />
                </div>
                <div>
                    <input type="password" placeholder="Nhập mật khẩu" />
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;