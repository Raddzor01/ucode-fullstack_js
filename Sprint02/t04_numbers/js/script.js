function checkDivision(begin_range, end_range) {
    for (let i = begin_range; i <= end_range; i++) {
        let msg = " -";

        if(i % 2 == 0) {
            msg = " is even";
        }

        if(i % 3 == 0) {
            if(msg != " -") {
                msg += ", ";
            } else {
                msg = " ";
            }
            msg += "is a multiple of 3";
        }

        if(i % 10 == 0) {
            if(msg != " -") {
                msg += ", ";
            } else {
                msg = " ";
            }
            msg += "is a multiple of 10";
        }

        console.log(i + msg);
    }
}


var begin_range = prompt("Enter the begin range");
var end_range = prompt("Enter the end range");
checkDivision(begin_range, end_range);
