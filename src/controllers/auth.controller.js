export const register = (req, res) => {
    console.log(req.body);
    res.send("register");
}

export const login = (req, res) => res.send("login");