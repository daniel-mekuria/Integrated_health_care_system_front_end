
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

function cumulativeSum(arr) {
    let sum = 0;
    return arr.map(num => sum += num);
}


function convertToCumulativeSum(array) {
    return array.map(item => {
      let sum = 0;
      item.data = item.data.map(value => sum += value);
      return item;
    });
  }

function countEntriesbydate(data,dataLabel, startDate, endDate, timeScale, categoryField = null) {
    let start = dayjs(startDate).startOf(timeScale);
    let end = dayjs(endDate).endOf(timeScale);
    let result = [];
    let categories = {};
    let dateValues = [];

    // Initialize counts for each category for each time unit in the date range
    data.forEach(item => {
        let category = item[categoryField] || ( categoryField!==null?'Uncategorized':dataLabel);
        if (categoryField === 'birthDate') category = getAgeGroup(category);
        categories[category] = Array(dayjs(end).diff(start, timeScale) + 1).fill(0);
    });

    data.forEach(item => {
        let createdAt = dayjs(item.createdAt);
        if (createdAt.isAfter(start.subtract(1, timeScale)) && createdAt.isBefore(end.add(1, timeScale))) {
            let category = item[categoryField] || ( categoryField!==null?'Uncategorized':dataLabel);;
            if (categoryField === 'birthDate') category = getAgeGroup(category);
            let index = createdAt.diff(start, timeScale);
            categories[category][index]++;
        }
    });

    for (let category in categories) {
        result.push({ label: category, data: categories[category] });
    }

    while (start.isBefore(end)) {
        let format = 'DD'; // Default format for days
        if (timeScale === 'Month') format = 'MMM'; // Abbreviated month name
        else if (timeScale === 'Year') format = 'YYYY'; // Four-digit year
        dateValues.push(start.format(format));
        start = start.add(1, timeScale);
    }

    return { x: dateValues, y: result };
}




function countTotalEntriesbydate(data,dataLabel, startDate, endDate, timeScale, categoryField = null) {
   let result=countEntriesbydate(data,dataLabel,startDate, endDate, timeScale, categoryField)

   result.y=convertToCumulativeSum(result.y)
    return result
}




function getAgeGroup(birthDate) {
    const age = dayjs().diff(dayjs(birthDate), 'year');
    if (age < 5) return '< 5';
    else if (age <= 12) return '5-12';
    else if (age <= 18) return '12-18';
    else if (age <= 35) return '18-35';
    else if (age <= 60) return '35-60';
    else return '>60';
}

function countEntries(data,dataLabel, startDate, endDate, countField, categoryField = null) {
    let start = dayjs(startDate);
    let end = dayjs(endDate).add(1, 'day');
    let result = [];
    let categories = {};
    let countFieldValues = [];

    // Get all unique countField values
    data.forEach(item => {
        let value = item[countField];
        if (countField === 'birthDate') value = getAgeGroup(value);
        if (!countFieldValues.includes(value)) {
            countFieldValues.push(value);
        }
    });

    // Initialize counts for each category for each unique value in the countField
    data.forEach(item => {
        let category = item[categoryField] ||( categoryField!==null?'Uncategorized':dataLabel);;
        if (categoryField === 'birthDate') category = getAgeGroup(category);
        if (!categories[category]) {
            categories[category] = {};
            countFieldValues.forEach(value => {
                categories[category][value] = 0; // Initialize count as 0 for each countField value
            });
        }
    });

    data.forEach(item => {
        let createdAt = dayjs(item.createdAt);
        if (createdAt.isAfter(start) && createdAt.isBefore(end)) {
            let category = item[categoryField] || ( categoryField!==null?'Uncategorized':dataLabel);;
            let countValue = item[countField];
            if (categoryField === 'birthDate') category = getAgeGroup(category);
            if (countField === 'birthDate') countValue = getAgeGroup(countValue);
            categories[category][countValue]++;
        }
    });

    for (let category in categories) {
        let data = [];
        for (let countValue of countFieldValues) {
            data.push(categories[category][countValue] || 0); // Add 0 if no count is there
        }
        result.push({ label: category, data: data });
    }

    return { x: countFieldValues, y: result };
}
function countTotalEntries(data,dataLabel, startDate, endDate, countField, categoryField = null) {
   let result=countEntries(data,dataLabel, startDate, endDate, countField, categoryField)
   result.y=convertToCumulativeSum(result.y)
   return result
}



export { countEntries,countTotalEntries,countEntriesbydate,countTotalEntriesbydate }
