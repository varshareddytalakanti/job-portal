document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const jobForm = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");

  // POST a new job
  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const company = document.getElementById("company").value;

    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ title, company })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Job posted!");
      jobForm.reset();
      fetchJobs();
    } else {
      alert("Error posting job");
    }
  });

  // GET all jobs
  async function fetchJobs() {
    const res = await fetch("http://localhost:5000/api/jobs");
    const jobs = await res.json();

    jobList.innerHTML = "";
    jobs.forEach(job => {
      const jobItem = document.createElement("div");
      jobItem.innerHTML = `
        <strong>${job.title}</strong> at ${job.company}
        <hr>
      `;
      jobList.appendChild(jobItem);
    });
  }

  fetchJobs();
});

// Logout function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
