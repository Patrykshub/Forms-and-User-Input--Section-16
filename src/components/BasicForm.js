import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    isValid: enteredFirstNameIsValid,
    value: enteredFirstName,
    hasError: enteredFirstNameError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlur,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    isValid: enteredLastNameIsValid,
    value: enteredLastName,
    hasError: enteredLastNameError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlur,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    isValid: enteredEmailIsValid,
    value: enteredEmail,
    hasError: enteredEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlur,
    reset: emailReset,
  } = useInput((value) => value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ));

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid= true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredFirstNameIsValid) {
      return;
    }
    if (!enteredLastNameIsValid) {
      return;
    }
    if (!enteredEmailIsValid) {
      return;
    }
    console.log(enteredFirstName, enteredLastName, enteredEmail);

    firstNameReset("");
    lastNameReset("");
    emailReset("");

  };

  const formFirstNameCheck = enteredFirstNameError
    ? "form-control invalid"
    : "form-control";
  const formLastNameCheck = enteredLastNameError
    ? "form-control invalid"
    : "form-control";
  const formEmailCheck = enteredEmailError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={formFirstNameCheck}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredFirstName}
            onBlur={firstNameInputBlur}
            onChange={firstNameChangeHandler}
          />
          {enteredFirstNameError && <p className='error-text'>Please enter your first name.</p>}
        </div>
        <div className={formLastNameCheck}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameInputBlur}
          />
          {enteredLastNameError && <p className='error-text'>Please enter your last name.</p>}
        </div>
      </div>
      <div className={formEmailCheck}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlur}
        />
        {enteredEmailError && <p className='error-text'>Please enter a valid email adress.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
