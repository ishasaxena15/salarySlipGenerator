var CalculateModule = {};

module.exports = CalculateModule;


CalculateModule.getTaxSlab = (annualSalary) => {
	if (annualSalary >= 0 && annualSalary <= 18200) {
		return 'taxSlabOne';
	} else if(annualSalary >= 18201 && annualSalary <= 37000)  {
		return 'taxSlabTwo';
	} else if(annualSalary >= 37001 && annualSalary <= 87000)  {
		return 'taxSlabThree';
	} else if(annualSalary >= 87001 && annualSalary <= 180000)  {
		return 'taxSlabFour';
	} else if(annualSalary >= 180001)  {
		return 'taxSlabFive';
	}

};

CalculateModule.getGrossIncome = (annualSalary) => {
	return Math.round(annualSalary/12);
};

CalculateModule.getSuperIncome = (grossSalary, superRate) => {
	return Math.round(grossSalary * (superRate*0.01));
};

CalculateModule.getIncTax = (annualSalary, TaxObj) => {
	console.log("TaxObj", TaxObj, annualSalary)
	return Math.round((TaxObj["fixAmount"] + ((annualSalary - TaxObj["upperLimit"]) * TaxObj["VariableRate"]))/12);
};

CalculateModule.getNetIncome = (annualSalary, IncTax) => {
	return Math.round(annualSalary - IncTax);
};
