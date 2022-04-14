const validate = (schema, path) => async (req, res, next) => {

  const {value, error} = schema.validate(req.body);
  
  if (error) {
    // error.details = [{message: ''}, {message: ''}]
    const errorMessage = error.details?.map(detail => detail.message).join(', ');
    // ["","","",""] => "aa,bb,cc"
    await req.flash('error', errorMessage);
    res.status(400).redirect(path);
    return;
  }
  Object.assign(req, value);
  return next();
}

module.exports = validate