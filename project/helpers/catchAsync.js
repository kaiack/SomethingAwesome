module.exports = func => {
    // Takes in a function and then runs the function, catches any errors and passes those to next.
    // Used to make our callbacks for our routes!.
    return (req, res, next) =>{
        func(req, res, next).catch(e=>next(e));
    }
}