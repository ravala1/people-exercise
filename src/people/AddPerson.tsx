import * as React from "react";
import styles from "./PeopleList.module.scss";
import * as services from "../dataServices";
import { Person } from "../types";


export const AddPerson = ({isEdit} :any) => {
  const [data, setData] = React.useState<Person[]>([]);
  const [values, setValues] = React.useState({} as Person);
  const [person, setPerson] = React.useState<Person>();
  const [error, setError] = React.useState<boolean>(false);
  const [submit, setSubmit] = React.useState<boolean>(false);

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  React.useEffect(() => {
    const fn = async () => {
      const people = await services.retrievePeople();
      setData(people);
    };
    fn();
  }, []);

  const onTextChange = (e: any) => {
    const { value, name} = e.target;

    if(name === 'firstName' || name === 'lastName') {
        if(value.length > 50) {
            setError(true)
            setErrorMessage('Please enter valid input');
        }
    }
    setValues({ 
        ...values, 
        [name]: value,
        ['id']: Math.floor(Math.random() *  10)
    });
  }

  const buttonClick = () => {
    if(values && !error) {
        const person: Person = {
            firstName: values?.firstName,
            lastName: values?.lastName,
            id: values?.id,
            email: values?.email,
            phone: values?.phone
          };
        const fn = async () => {
            !isEdit? 
            await services.createPerson(person).then(() => {
                let updated =  services.retrievePeople();
                setData({
                    ...data,
                    ...updated
                });
            })
            :
            await services.updatePerson(person)
        };
        fn();
    }
  }

  const cancelClick = () => {
  }

  return (
    <div className={styles.PersonList}>
            <form>
                <div><label>First Name</label>
                <input className='form-control' 
                    name='firstName'
                    onChange={e => onTextChange(e)} 
                    type='text' 
                    required
                    value={person?.firstName} 
                    />
                </div>
                <div>
                 <label>Last Name</label>
                <input 
                    name='lastName'
                    onChange={e => onTextChange(e)} 
                    className='form-control' 
                    type='text' 
                    required
                    value={person?.lastName} />
                </div>
                <div>
                <label>Email</label>
                 <input 
                    name='email'
                    onChange={e => onTextChange(e)} 
                    className='form-control' 
                    type='text' 
                    required
                    value={person?.email} />
                </div>
                <div>
                <label>Phone Number</label>
                 <input 
                    name='phone'
                    onChange={e => onTextChange(e)} 
                    className='form-control' 
                    type='text' 
                    value={person?.phone} />
                </div>
                <input 
                    name='id'
                    onChange={e => onTextChange(e)} 
                    className='form-control' 
                    type='hidden' 
                    value={person?.id || Math.random()} />
                <button 
                    className={isEdit ? 'btn btn-success': 'btn btn-primary'}
                    onClick={buttonClick}
                    type='submit'
                    >
                    {isEdit ? 'Update': 'Save'}
                </button>
                <button type='button'
                    className='btn btn-danger'
                    onClick={cancelClick}
                    >
                    Cancel
                </button>
            </form>
            {!error && errorMessage}
    </div>
  );
};
