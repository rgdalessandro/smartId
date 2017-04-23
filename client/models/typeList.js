/**
 * Created by stevendakh on 4/23/17.
 */
export const typeList = {
  dob: {
    title: "Date of Birth",
    placeholder: "DD-MM-YYYY"
  },
  ssn: {
    title: "SSN #"
  },
  snn: {
    title: "SSN #"
  },
  name: {
    title: "Name"
  },
  email: {
    title: "E-mail"
  }
};

export const getTypeData = (type) => {
  if ( typeList[type] ) {
    return typeList[type];
  } else {
    return {
      title: type
    };
  }
};