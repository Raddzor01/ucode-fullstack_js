function animal_test(animal) {
    var regex1 = /^[A-Za-z]+$/;
    var regex2 = /^.{21,}$/;
    if(!regex1.test(animal)) {
        alert("Input must contain only letters and/or only one word!");
        return true;
    }
    if(regex2.test(animal)) {
        alert("Input must be less than 20 characters!");
        return true;
    }
}

function gender_test(gender) {
    var regex1 = /^[mM][aA][lL][eE]$/;
    var regex2 = /^[fF][eE][mM][aA][lL][eE]$/;
    if(!regex1.test(gender) && !regex2.test(gender) && gender != "") {
        alert("Input must be either male or female or blank!");
        return true;
    }
}

function age_test(age) {
    var ragex1 = /^.{6,}$/;
    if(ragex1.test(age)) {
        alert("Input must be less than 6 characters!");
        return true;
    }
    var regex2 = /^\d+$/;
    if(!regex2.test(age)) {
        alert("Input must be a number!");
        return true;
    }
    var regex3 = /^0/;
    if(regex3.test(age)) {
        alert("Input must starting greater than 0!");
        return true;
    }
    return ragex1.test(age) || !regex2.test(age) || regex3.test(age);
}

function description_gen(gender, age) {
    var regex1 = /^[mM][aA][lL][eE]$/;
    var regex2 = /^[fF][eE][mM][aA][lL][eE]$/;
    if (regex1.test(gender)) {
        if (age < 18) {
            return "boy";
        }
        return "man";
    }

    if (regex2.test(gender)) {
        if (age < 18) {
            return "girl";
        }
        return "woman";
    }

    if (age < 18) {
        return "kid";
    }
    return "hero";
}

const animal = prompt("What animal is the superhero most similar to?");
if (!animal_test(animal)) {
    const gender = prompt("Is the superhero male or female? Leave blank if unknown or other.");
    if (!gender_test(gender)) {
        const age = prompt("How old is the superhero?");
        if (!age_test(age)) {
            alert("The superhero name is: " + animal + "-" + description_gen(gender, age) + "!");
        }
    }
}
