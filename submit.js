function submitForm(event) {
    event.preventDefault();

    // Fetch the form inputs
    const rollnoInput = document.getElementById('rollno');
    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const contactnoInput = document.getElementById('contactno');

    // Prepare the form data
    const formData = {
        rollno: rollnoInput.value,
        name: nameInput.value,
        address: addressInput.value,
        dob: dobInput.value,
        age: ageInput.value,
        gender: genderInput.value,
        contactno: contactnoInput.value
    };

    // Send the form data to the server
    fetch('/submit-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Form submitted successfully');
            // Reset the form inputs
            rollnoInput.value = '';
            nameInput.value = '';
            addressInput.value = '';
            dobInput.value = '';
            ageInput.value = '';
            genderInput.value = '';
            contactnoInput.value = '';
        } else {
            alert('Error submitting form. Please try again.');
        }
    })
    .catch(error => {
        console.error('An error occurred while submitting the form:', error);
        alert('An error occurred while submitting the form. Please try again.');
    });
}
