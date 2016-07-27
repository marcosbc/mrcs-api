'use strict';
module.exports = {
  index: (req, res, next) => {
    var apiHttpUtils = req.app.get('apiUtils').http;
    apiHttpUtils.verifyToken(req, (token, err) => {
      if (err) {
        console.error(err);
        return apiHttpUtils.errorResponse(res, err);
      }
      if (!token) {
        return apiHttpUtils.unauthorizedResponse(res);
      }
      res.json({
        apps: ['reminders', 'timetable']
      });
    });
  }
};
