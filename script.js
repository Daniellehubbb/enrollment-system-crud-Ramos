document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  const navButtons = document.querySelectorAll("nav button");
  const btnStudents = document.getElementById("tab-students");
  const btnPrograms = document.getElementById("tab-programs");
  const btnYears = document.getElementById("tab-years");
  const btnSemesters = document.getElementById("tab-semesters");
  const btnSubjects = document.getElementById("tab-subjects");
  const btnEnrollments = document.getElementById("tab-enrollments");

  const formModal = document.getElementById("form-modal");
  const formModalBody = document.getElementById("form-modal-body");
  const formModalClose = document.getElementById("form-modal-close");

  const errorModal = document.getElementById("error-modal");
  const errorModalClose = document.getElementById("error-modal-close");
  const errorMessage = document.getElementById("error-message");

  function setActiveTab(button) {
    navButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  }

  function showError(msg) {
    errorMessage.textContent = msg;
    errorModal.style.display = "flex";
  }

  formModalClose.addEventListener("click", () => (formModal.style.display = "none"));
  errorModalClose.addEventListener("click", () => (errorModal.style.display = "none"));

  window.addEventListener("click", (e) => {
    if (e.target === formModal) formModal.style.display = "none";
    if (e.target === errorModal) errorModal.style.display = "none";
  });

  // STUDENTS
  async function loadStudents() {
    setActiveTab(btnStudents);

    try {
      const res = await fetch("project_api/Students/getStudents.php");
      const data = await res.json();

      if (data.success) {
        let html = `
          <h2>Students</h2>
          <button id="btn-add-student">Add Student</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Program ID</th>
                <th>Allowance</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
        `;

        data.data.forEach(stud => {
          html += `
            <tr>
              <td>${stud.stud_id}</td>
              <td>${stud.first_name}</td>
              <td>${stud.middle_name || ""}</td>
              <td>${stud.last_name}</td>
              <td>${stud.program_id}</td>
              <td>${stud.ALLOWANCE}</td>
              <td>
                <button class="btn-edit" data-id="${stud.stud_id}">Edit</button>
                <button class="btn-delete" data-id="${stud.stud_id}">Delete</button>
              </td>
            </tr>
          `;
        });

        html += `</tbody></table>`;
        content.innerHTML = html;

        // ADD STUDENT
        document.getElementById("btn-add-student").addEventListener("click", () => {
          formModalBody.innerHTML = `
            <h3>Add Student</h3>
            <form id="add-student-form">
              <label>Student ID:</label><br>
              <input type="text" name="stud_id" required><br>
              <label>First Name:</label><br>
              <input type="text" name="first_name" required><br>
              <label>Middle Name:</label><br>
              <input type="text" name="middle_name"><br>
              <label>Last Name:</label><br>
              <input type="text" name="last_name" required><br>
              <label>Program ID:</label><br>
              <input type="text" name="program_id" required><br>
              <label>Allowance:</label><br>
              <input type="number" name="allowance" required><br><br>
              <button type="submit">Save</button>
            </form>
          `;
          formModal.style.display = "flex";

          document.getElementById("add-student-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch("project_api/Students/addStudent.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            formModal.style.display = "none";
            loadStudents();
          });
        });

        // EDIT STUDENT
        document.querySelectorAll(".btn-edit").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr").children;
            const id = btn.dataset.id;

            formModalBody.innerHTML = `
              <h3>Edit Student</h3>
              <form id="edit-student-form">
                <input type="hidden" name="stud_id" value="${id}">
                <label>First Name:</label><br>
                <input type="text" name="first_name" value="${row[1].textContent}" required><br>
                <label>Middle Name:</label><br>
                <input type="text" name="middle_name" value="${row[2].textContent}"><br>
                <label>Last Name:</label><br>
                <input type="text" name="last_name" value="${row[3].textContent}" required><br>
                <label>Program ID:</label><br>
                <input type="text" name="program_id" value="${row[4].textContent}" required><br>
                <label>Allowance:</label><br>
                <input type="number" name="allowance" value="${row[5].textContent}" required><br><br>
                <button type="submit">Update</button>
              </form>
            `;
            formModal.style.display = "flex";

            document.getElementById("edit-student-form").addEventListener("submit", async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);

              const res = await fetch("project_api/Students/updateStudent.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              });
              const result = await res.json();
              alert(result.message);
              formModal.style.display = "none";
              loadStudents();
            });
          });
        });

        // DELETE STUDENT
        document.querySelectorAll(".btn-delete").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            const id = btn.dataset.id;
            if (!confirm("Are you sure you want to delete student ID: " + id + "?")) return;

            const res = await fetch("project_api/Students/deleteStudent.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ stud_id: id })
            });
            const result = await res.json();
            alert(result.message);
            loadStudents();
          });
        });

      } else {
        showError(data.message);
      }
    } catch (err) {
      showError("Fetch error: " + err.message);
    }
  }

  // PROGRAMS
  async function loadPrograms() {
    setActiveTab(btnPrograms);

    try {
      const res = await fetch("project_api/Programs/getPrograms.php");
      const data = await res.json();

      if (data.success) {
        let html = `
          <h2>Programs</h2>
          <button id="btn-add-program">Add Program</button>
          <table>
            <thead>
              <tr>
                <th>Program ID</th>
                <th>Program Name</th>
                <th>Ins ID</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
        `;

        data.data.forEach(prog => {
          html += `
            <tr>
              <td>${prog.program_id}</td>
              <td>${prog.program_name}</td>
              <td>${prog.ins_id}</td>
              <td>
                <button class="btn-edit" data-id="${prog.program_id}">Edit</button>
                <button class="btn-delete" data-id="${prog.program_id}">Delete</button>
              </td>
            </tr>
          `;
        });

        html += `</tbody></table>`;
        content.innerHTML = html;

        // ADD PROGRAM
        document.getElementById("btn-add-program").addEventListener("click", () => {
          formModalBody.innerHTML = `
            <h3>Add Program</h3>
            <form id="add-program-form">
              <label>Program ID:</label><br>
              <input type="text" name="program_id" required><br>
              <label>Program Name:</label><br>
              <input type="text" name="program_name" required><br>
              <label>Instructor ID:</label><br>
              <input type="text" name="ins_id" required><br><br>
              <button type="submit">Save</button>
            </form>
          `;
          formModal.style.display = "flex";

          document.getElementById("add-program-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch("project_api/Programs/addProgram.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            formModal.style.display = "none";
            loadPrograms();
          });
        });

        // EDIT PROGRAM
        document.querySelectorAll(".btn-edit").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr").children;
            const id = btn.dataset.id;

            formModalBody.innerHTML = `
              <h3>Edit Program</h3>
              <form id="edit-program-form">
                <input type="hidden" name="program_id" value="${id}">
                <label>Program Name:</label><br>
                <input type="text" name="program_name" value="${row[1].textContent}" required><br>
                <label>Instructor ID:</label><br>
                <input type="text" name="ins_id" value="${row[2].textContent}" required><br><br>
                <button type="submit">Update</button>
              </form>
            `;
            formModal.style.display = "flex";

            document.getElementById("edit-program-form").addEventListener("submit", async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);

              const res = await fetch("project_api/Programs/updateProgram.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              });
              const result = await res.json();
              alert(result.message);
              formModal.style.display = "none";
              loadPrograms();
            });
          });
        });

        // DELETE PROGRAM
        document.querySelectorAll(".btn-delete").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            const id = btn.dataset.id;
            if (!confirm("Are you sure you want to delete program ID: " + id + "?")) return;

            const res = await fetch("project_api/Programs/deleteProgram.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ program_id: id })
            });
            const result = await res.json();
            alert(result.message);
            loadPrograms();
          });
        });

      } else {
        showError(data.message);
      }
    } catch (err) {
      showError("Fetch error: " + err.message);
    }
  }

  // YEARS
  async function loadYears() {
    setActiveTab(btnYears);

    try {
      const res = await fetch("project_api/Years/getYears.php");
      const data = await res.json();

      if (data.success) {
        let html = `
          <h2>Years</h2>
          <button id="btn-add-year">Add Year</button>
          <table>
            <thead>
              <tr>
                <th>Year ID</th>
                <th>Year From</th>
                <th>Year To</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
        `;

        data.data.forEach(year => {
          html += `
            <tr>
              <td>${year.year_id}</td>
              <td>${year.year_from}</td>
              <td>${year.year_to}</td>
              <td>
                <button class="btn-edit" data-id="${year.year_id}">Edit</button>
                <button class="btn-delete" data-id="${year.year_id}">Delete</button>
              </td>
            </tr>
          `;
        });

        html += `</tbody></table>`;
        content.innerHTML = html;

        // ADD YEAR
        document.getElementById("btn-add-year").addEventListener("click", () => {
          formModalBody.innerHTML = `
            <h3>Add Year</h3>
            <form id="add-year-form">
              <label>Year ID:</label><br>
              <input type="text" name="year_id" required><br>
              <label>Year From:</label><br>
              <input type="number" name="year_from" required><br>
              <label>Year To:</label><br>
              <input type="number" name="year_to" required><br><br>
              <button type="submit">Save</button>
            </form>
          `;
          formModal.style.display = "flex";

          document.getElementById("add-year-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch("project_api/Years/addYear.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            formModal.style.display = "none";
            loadYears();
          });
        });

        // EDIT YEAR
        document.querySelectorAll(".btn-edit").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr").children;
            const id = btn.dataset.id;

            formModalBody.innerHTML = `
              <h3>Edit Year</h3>
              <form id="edit-year-form">
                <input type="hidden" name="year_id" value="${id}">
                <label>Year From:</label><br>
                <input type="number" name="year_from" value="${row[1].textContent}" required><br>
                <label>Year To:</label><br>
                <input type="number" name="year_to" value="${row[2].textContent}" required><br><br>
                <button type="submit">Update</button>
              </form>
            `;
            formModal.style.display = "flex";

            document.getElementById("edit-year-form").addEventListener("submit", async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);

              const res = await fetch("project_api/Years/updateYear.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              });
              const result = await res.json();
              alert(result.message);
              formModal.style.display = "none";
              loadYears();
            });
          });
        });

        // DELETE YEAR
        document.querySelectorAll(".btn-delete").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            const id = btn.dataset.id;
            if (!confirm("Are you sure you want to delete year ID: " + id + "?")) return;

            const res = await fetch("project_api/Years/deleteYear.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ year_id: id })
            });
            const result = await res.json();
            alert(result.message);
            loadYears();
          });
        });

      } else {
        showError(data.message);
      }
    } catch (err) {
      showError("Fetch error: " + err.message);
    }
  }


// SEMESTERS
  async function loadSemesters() {
    setActiveTab(btnSemesters);

    try {
      const res = await fetch("project_api/Semesters/getSemesters.php");
      const data = await res.json();

      if (data.success) {
        let html = `
          <h2>Semesters</h2>
          <button id="btn-add-semester">Add Semester</button>
          <table>
            <thead>
              <tr>
                <th>Semester ID</th>
                <th>Semester Name</th>
                <th>Year ID</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
        `;

        data.data.forEach(sem => {
          html += `
            <tr>
              <td>${sem.sem_id}</td>
              <td>${sem.sem_name}</td>
              <td>${sem.year_id}</td>
              <td>
                <button class="btn-edit" data-id="${sem.sem_id}">Edit</button>
                <button class="btn-delete" data-id="${sem.sem_id}">Delete</button>
              </td>
            </tr>
          `;
        });

        html += `</tbody></table>`;
        content.innerHTML = html;

        // ADD SEMESTER
        document.getElementById("btn-add-semester").addEventListener("click", () => {
          formModalBody.innerHTML = `
            <h3>Add Semester</h3>
            <form id="add-semester-form">
              <label>Semester ID:</label><br>
              <input type="text" name="sem_id" required><br>
              <label>Semester Name:</label><br>
              <input type="text" name="sem_name" required><br>
              <label>Year ID:</label><br>
              <input type="text" name="year_id" required><br><br>
              <button type="submit">Save</button>
            </form>
          `;
          formModal.style.display = "flex";

          document.getElementById("add-semester-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch("project_api/Semesters/addSemester.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            formModal.style.display = "none";
            loadSemesters();
          });
        });

        // EDIT SEMESTER
        document.querySelectorAll(".btn-edit").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr").children;
            const id = btn.dataset.id;

            formModalBody.innerHTML = `
              <h3>Edit Semester</h3>
              <form id="edit-semester-form">
                <input type="hidden" name="sem_id" value="${id}">
                <label>Semester Name:</label><br>
                <input type="text" name="sem_name" value="${row[1].textContent}" required><br>
                <label>Year ID:</label><br>
                <input type="text" name="year_id" value="${row[2].textContent}" required><br><br>
                <button type="submit">Update</button>
              </form>
            `;
            formModal.style.display = "flex";

            document.getElementById("edit-semester-form").addEventListener("submit", async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);

              const res = await fetch("project_api/Semesters/updateSemester.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              });
              const result = await res.json();
              alert(result.message);
              formModal.style.display = "none";
              loadSemesters();
            });
          });
        });

        // DELETE SEMESTER
        document.querySelectorAll(".btn-delete").forEach(btn => {
          btn.addEventListener("click", async (e) => {
            const id = btn.dataset.id;
            if (!confirm("Are you sure you want to delete semester ID: " + id + "?")) return;

            const res = await fetch("project_api/Semesters/deleteSemester.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sem_id: id })
            });
            const result = await res.json();
            alert(result.message);
            loadSemesters();
          });
        });

      } else {
        showError(data.message);
      }
    } catch (err) {
      showError("Fetch error: " + err.message);
    }
  }

// SUBJECTS
async function loadSubjects() {
  setActiveTab(btnSubjects);

  try {
    const res = await fetch("project_api/Subjects/getSubjects.php");
    const data = await res.json();

    if (data.success) {
      let html = `
        <h2>Subjects</h2>
        <button id="btn-add-subject">Add Subject</button>
        <table>
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Subject Name</th>
              <th>Semester ID</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
      `;

      data.data.forEach(sub => {
        html += `
          <tr>
            <td>${sub.subject_id}</td>
            <td>${sub.subject_name}</td>
            <td>${sub.sem_id}</td>
            <td>
              <button class="btn-edit" data-id="${sub.subject_id}">Edit</button>
              <button class="btn-delete" data-id="${sub.subject_id}">Delete</button>
            </td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      content.innerHTML = html;

      // ADD SUBJECT
      document.getElementById("btn-add-subject").addEventListener("click", () => {
        formModalBody.innerHTML = `
          <h3>Add Subject</h3>
          <form id="add-subject-form">
            <label>Subject ID:</label><br>
            <input type="text" name="subject_id" required><br>
            <label>Subject Name:</label><br>
            <input type="text" name="subject_name" required><br>
            <label>Semester ID:</label><br>
            <input type="text" name="sem_id" required><br><br>
            <button type="submit">Save</button>
          </form>
        `;
        formModal.style.display = "flex";

        document.getElementById("add-subject-form").addEventListener("submit", async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);

          const res = await fetch("project_api/Subjects/addSubject.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          alert(result.message);
          formModal.style.display = "none";
          loadSubjects();
        });
      });

      // EDIT SUBJECT
      document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const row = e.target.closest("tr").children;
          const id = btn.dataset.id;

          formModalBody.innerHTML = `
            <h3>Edit Subject</h3>
            <form id="edit-subject-form">
              <input type="hidden" name="subject_id" value="${id}">
              <label>Subject Name:</label><br>
              <input type="text" name="subject_name" value="${row[1].textContent}" required><br>
              <label>Semester ID:</label><br>
              <input type="text" name="sem_id" value="${row[2].textContent}" required><br><br>
              <button type="submit">Update</button>
            </form>
          `;
          formModal.style.display = "flex";

          document.getElementById("edit-subject-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch("project_api/Subjects/updateSubject.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            formModal.style.display = "none";
            loadSubjects();
          });
        });
      });

      // DELETE SUBJECT
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          const id = btn.dataset.id;
          if (!confirm("Are you sure you want to delete subject ID: " + id + "?")) return;

          const res = await fetch("project_api/Subjects/deleteSubject.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject_id: id })
          });
          const result = await res.json();
          alert(result.message);
          loadSubjects();
        });
      });

    } else {
      showError(data.message);
    }
  } catch (err) {
    showError("Fetch error: " + err.message);
  }
}

// ENROLLMENTS
async function loadEnrollments() {
  setActiveTab(btnEnrollments);

  try {
    const res = await fetch("project_api/Enrollments/getEnrollments.php");
    const data = await res.json();

    if (data.success) {
      let html = `
        <h2>Enrollments</h2>
        <button id="btn-add-enrollment">Enroll Student</button>
        <table>
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Student Name</th>
              <th>Program</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Date Enrolled</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
      `;

      data.data.forEach(en => {
        const studentName = `${en.first_name} ${en.middle_name || ""} ${en.last_name}`;
        const yearRange = `${en.year_from} - ${en.year_to}`;
        html += `
          <tr>
            <td>${en.enroll_id}</td>
            <td>${studentName}</td>
            <td>${en.program_name}</td>
            <td>${en.subject_name}</td>
            <td>${en.sem_name}</td>
            <td>${yearRange}</td>
            <td>${en.date_enrolled}</td>
            <td>
              <button class="btn-edit" data-id="${en.enroll_id}">Edit</button>
              <button class="btn-delete" data-id="${en.enroll_id}">Delete</button>
            </td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      content.innerHTML = html;

      // ADD ENROLLMENT
      document.getElementById("btn-add-enrollment").addEventListener("click", () => {
        formModalBody.innerHTML = `
          <h3>Enroll Student</h3>
          <form id="add-enrollment-form">
            <label>Enrollment ID:</label><br>
            <input type="text" name="enroll_id" required><br>
            <label>Student ID:</label><br>
            <input type="text" name="stud_id" required><br>
            <label>Subject ID:</label><br>
            <input type="text" name="subject_id" required><br><br>
            <button type="submit">Enroll</button>
          </form>
        `;
        formModal.style.display = "flex";

        document.getElementById("add-enrollment-form").addEventListener("submit", async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);

          const res = await fetch("project_api/Enrollments/enrollStudent.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          alert(result.message);
          formModal.style.display = "none";
          loadEnrollments();
        });
      });

      // EDIT ENROLLMENT
      document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const row = e.target.closest("tr").children;
          const id = btn.dataset.id;

          formModalBody.innerHTML = `
            <h3>Edit Enrollment</h3>
            <form id="edit-enrollment-form">
              <input type="hidden" name="enroll_id" value="${id}">
              <label>Student ID:</label><br>
              <input type="text" name="stud_id" required><br>
              <label>Subject ID:</label><br>
              <input type="text" name="subject_id" required><br>
              <label>Date Enrolled:</label><br>
              <input type="date" name="date_enrolled" value="${row[6].textContent}" required><br><br>
              <button type="submit">Update</button>
            </form>
          `;
          formModal.style.display = "flex";

          document.getElementById("edit-enrollment-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            const res = await fetch("project_api/Enrollments/updateEnrollment.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            formModal.style.display = "none";
            loadEnrollments();
          });
        });
      });

      // DELETE ENROLLMENT
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          const id = btn.dataset.id;
          if (!confirm("Are you sure you want to remove enrollment ID: " + id + "?")) return;

          const res = await fetch("project_api/Enrollments/removeEnrollment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ enroll_id: id })
          });
          const result = await res.json();
          alert(result.message);
          loadEnrollments();
        });
      });

    } else {
      showError(data.message);
    }
  } catch (err) {
    showError("Fetch error: " + err.message);
  }
}


  btnStudents.addEventListener("click", loadStudents);
  btnPrograms.addEventListener("click", loadPrograms);
  btnYears.addEventListener("click", loadYears);
  btnSemesters.addEventListener("click", loadSemesters);
  btnSubjects.addEventListener("click", loadSubjects);
  btnEnrollments.addEventListener("click", loadEnrollments);


  loadStudents();
});
