const logoutController = async (req, res) => {
    const userId = req.params.id;
    console.log("User ID:", userId); // add this line to log the user id
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Error logging out"
            });
        }
        return res.status(200).json({
            message: "Logout successful"
        });
    });
}

export default logoutController;

