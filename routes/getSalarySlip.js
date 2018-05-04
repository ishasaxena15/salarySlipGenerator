var Route = require('../lib/Route');
var errors = require('../lib/errors');
var Calculate = require('../lib/method');
var settings = require('../config/settings');
var route = new Route('post', '/getSalarySlip');

module.exports = route;
// public route
route.setPublic();

// validate input body 
route.validateInputBody({
    type: 'object',
    properties: {
        first_name : {
            type: 'string'
        },        
        last_name : {
            type: 'string'
        },        
        super_rate : {
            type: 'number'
        },        
        annual_salary : {
            type: 'number'
        },
        pay_start_date: {
            type: 'string'
        }
    },
    required: ['first_name', 'last_name', 'super_rate' , 'annual_salary', 'pay_start_date']

});

// creating 
route.use(function(req, res, next) {
    res.locals.Name =  req.body.first_name+" "+req.body.last_name;
    res.locals.payPeriod =  req.body.pay_start_date;
    var annual_salary = req.body.annual_salary;
    res.locals.grossIncome = Calculate.getGrossIncome(annual_salary);
    return next();
});

// creating 
route.use(function(req, res, next) {
    var super_rate = req.body.super_rate;
    res.locals.superIncome = Calculate.getSuperIncome(res.locals.grossIncome, super_rate);
    return next();
});

// creating 
route.use(function(req, res, next) {
    var annual_salary = req.body.annual_salary;
    var taxObject = settings[Calculate.getTaxSlab(annual_salary)];
	res.locals.taxAmount = Calculate.getIncTax(annual_salary, taxObject);

	return next();
});

// creating 
route.use(function(req, res, next) {
	res.locals.netIncome = Calculate.getNetIncome(res.locals.grossIncome, res.locals.taxAmount);
	return next();
});

route.use(function(req, res){
	return res.json({ salarySlip : res.locals});
})


