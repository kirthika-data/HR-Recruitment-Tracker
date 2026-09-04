// Get saved candidates from browser storage
let candidates = JSON.parse(localStorage.getItem("candidates")) || [];

// Add Candidate Form
const candidateForm = document.getElementById("candidateForm");

if (candidateForm) {

    candidateForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get values from the form
        const candidate = {
            id: document.getElementById("candidateId").value,
            name: document.getElementById("candidateName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            position: document.getElementById("position").value,
            department: document.getElementById("department").value,
            experience: document.getElementById("experience").value,
            skills: document.getElementById("skills").value,
            applicationDate: document.getElementById("applicationDate").value,
            status: document.getElementById("status").value
        };

        // Add candidate to the list
        candidates.push(candidate);

        // Save candidates in browser
        localStorage.setItem("candidates", JSON.stringify(candidates));

        // Show success message
        alert("Candidate added successfully!");

        // Clear the form
        candidateForm.reset();

    });
}
// Display candidates in the table
const candidateTableBody = document.getElementById("candidateTableBody");

function displayCandidates(list) {

    if (!candidateTableBody) return;

    candidateTableBody.innerHTML = "";

    if (list.length === 0) {

        candidateTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No candidates found
                </td>
            </tr>
        `;

        return;
    }

    list.forEach((candidate, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${candidate.id}</td>
            <td>${candidate.name}</td>
            <td>${candidate.position}</td>
            <td>${candidate.department}</td>
            <td>${candidate.experience} year(s)</td>
            <td>${candidate.status}</td>
            <td>
                <button
                    class="delete-button"
                    onclick="deleteCandidate(${index})">
                    Delete
                </button>
            </td>
        `;

        candidateTableBody.appendChild(row);
    });
}


// Delete candidate
function deleteCandidate(index) {

    if (confirm("Are you sure you want to delete this candidate?")) {

        candidates.splice(index, 1);

        localStorage.setItem(
            "candidates",
            JSON.stringify(candidates)
        );

        displayCandidates(candidates);
    }
}


// Search candidates
const searchCandidate = document.getElementById("searchCandidate");

if (searchCandidate) {

    searchCandidate.addEventListener("input", function() {

        const searchText = this.value.toLowerCase();

        const filteredCandidates = candidates.filter(candidate =>
            candidate.name.toLowerCase().includes(searchText) ||
            candidate.position.toLowerCase().includes(searchText) ||
            candidate.department.toLowerCase().includes(searchText)
        );

        displayCandidates(filteredCandidates);
    });
}


// Filter by status
const statusFilter = document.getElementById("statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", function() {

        const selectedStatus = this.value;

        if (selectedStatus === "") {

            displayCandidates(candidates);

        } else {

            const filteredCandidates = candidates.filter(
                candidate => candidate.status === selectedStatus
            );

            displayCandidates(filteredCandidates);
        }
    });
}


// Show candidates when page opens
displayCandidates(candidates);
// ================================
// INTERVIEW TRACKER
// ================================

// Get saved interviews
let interviews =
    JSON.parse(localStorage.getItem("interviews")) || [];


// Load candidates into interview dropdown
const interviewCandidate =
    document.getElementById("interviewCandidate");

if (interviewCandidate) {

    candidates.forEach(candidate => {

        const option = document.createElement("option");

        option.value = candidate.id;

        option.textContent =
            `${candidate.name} - ${candidate.position}`;

        interviewCandidate.appendChild(option);

    });

}


// Interview form
const interviewForm =
    document.getElementById("interviewForm");

if (interviewForm) {

    interviewForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const selectedCandidateId =
                document.getElementById(
                    "interviewCandidate"
                ).value;

            const selectedCandidate =
                candidates.find(
                    candidate =>
                        candidate.id === selectedCandidateId
                );


            const interview = {

                candidateId:
                    selectedCandidateId,

                candidateName:
                    selectedCandidate
                        ? selectedCandidate.name
                        : "Unknown",

                date:
                    document.getElementById(
                        "interviewDate"
                    ).value,

                round:
                    document.getElementById(
                        "interviewRound"
                    ).value,

                interviewer:
                    document.getElementById(
                        "interviewer"
                    ).value,

                status:
                    document.getElementById(
                        "interviewStatus"
                    ).value,

                feedback:
                    document.getElementById(
                        "feedback"
                    ).value

            };


            // Save interview
            interviews.push(interview);

            localStorage.setItem(
                "interviews",
                JSON.stringify(interviews)
            );


            alert("Interview scheduled successfully!");


            // Clear form
            interviewForm.reset();


            // Refresh table
            displayInterviews();

        }
    );

}


// Display interview records
function displayInterviews() {

    const interviewTableBody =
        document.getElementById(
            "interviewTableBody"
        );

    if (!interviewTableBody) return;


    interviewTableBody.innerHTML = "";


    if (interviews.length === 0) {

        interviewTableBody.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;">
                    No interview records found
                </td>
            </tr>
        `;

        return;
    }


    interviews.forEach(interview => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${interview.candidateName}
            </td>

            <td>
                ${interview.date}
            </td>

            <td>
                ${interview.round}
            </td>

            <td>
                ${interview.interviewer}
            </td>

            <td>
                ${interview.status}
            </td>

            <td>
                ${interview.feedback || "-"}
            </td>

        `;


        interviewTableBody.appendChild(row);

    });

}


// Display interviews when page opens
displayInterviews();
// ================================
// RECRUITMENT ANALYTICS
// ================================

function updateAnalytics() {

    const total = candidates.length;

    const shortlisted =
        candidates.filter(
            candidate => candidate.status === "Shortlisted"
        ).length;

    const interview =
        candidates.filter(
            candidate => candidate.status === "Interview"
        ).length;

    const selected =
        candidates.filter(
            candidate => candidate.status === "Selected"
        ).length;

    const rejected =
        candidates.filter(
            candidate => candidate.status === "Rejected"
        ).length;

    const applied =
        candidates.filter(
            candidate => candidate.status === "Applied"
        ).length;


    // Update cards

    const totalElement =
        document.getElementById("analyticsTotal");

    if (totalElement)
        totalElement.textContent = total;


    const shortlistedElement =
        document.getElementById("analyticsShortlisted");

    if (shortlistedElement)
        shortlistedElement.textContent = shortlisted;


    const interviewElement =
        document.getElementById("analyticsInterviews");

    if (interviewElement)
        interviewElement.textContent = interview;


    const selectedElement =
        document.getElementById("analyticsSelected");

    if (selectedElement)
        selectedElement.textContent = selected;


    const rejectedElement =
        document.getElementById("analyticsRejected");

    if (rejectedElement)
        rejectedElement.textContent = rejected;


    // Selection rate

    let rate = 0;

    if (total > 0) {
        rate = ((selected / total) * 100).toFixed(1);
    }


    const rateElement =
        document.getElementById("selectionRate");

    if (rateElement)
        rateElement.textContent = rate + "%";


    // Status breakdown

    const appliedElement =
        document.getElementById("appliedCount");

    if (appliedElement)
        appliedElement.textContent = applied;


    const shortlistedCount =
        document.getElementById("shortlistedCount");

    if (shortlistedCount)
        shortlistedCount.textContent = shortlisted;


    const interviewCount =
        document.getElementById("interviewCount");

    if (interviewCount)
        interviewCount.textContent = interview;


    const selectedCount =
        document.getElementById("selectedCount");

    if (selectedCount)
        selectedCount.textContent = selected;


    const rejectedCount =
        document.getElementById("rejectedCount");

    if (rejectedCount)
        rejectedCount.textContent = rejected;


    // Recruitment summary

    const summary =
        document.getElementById("recruitmentSummary");

    if (summary) {

        if (total === 0) {

            summary.textContent =
                "No recruitment data available yet.";

        } else {

            summary.textContent =
                `There are currently ${total} candidates in the recruitment pipeline. 
                ${shortlisted} candidates are shortlisted, 
                ${interview} are in the interview stage, 
                ${selected} have been selected, and 
                ${rejected} have been rejected. 
                The current selection rate is ${rate}%.`;

        }

    }

}


// Run analytics
updateAnalytics();
// ================================
// DYNAMIC DASHBOARD
// ================================

function updateDashboard() {

    const total = candidates.length;

    const interviews =
        candidates.filter(
            candidate => candidate.status === "Interview"
        ).length;

    const selected =
        candidates.filter(
            candidate => candidate.status === "Selected"
        ).length;

    const rejected =
        candidates.filter(
            candidate => candidate.status === "Rejected"
        ).length;


    const totalElement =
        document.getElementById("totalCandidates");

    if (totalElement) {
        totalElement.textContent = total;
    }


    const interviewElement =
        document.getElementById("totalInterviews");

    if (interviewElement) {
        interviewElement.textContent = interviews;
    }


    const selectedElement =
        document.getElementById("selectedCandidates");

    if (selectedElement) {
        selectedElement.textContent = selected;
    }


     const rejectedElement =
    document.getElementById("rejectedCandidates");

if (rejectedElement) {
    rejectedElement.textContent = rejected;
}
const dashboardRate =
    document.getElementById("dashboardSelectionRate");

if (dashboardRate) {

    const rate =
        total > 0
            ? ((selected / total) * 100).toFixed(1)
            : 0;

    dashboardRate.textContent =
        rate + "%";
}

}
    
// ================================
// RECRUITMENT CHARTS
// ================================

function createRecruitmentCharts() {

    // ----------------------------
    // Candidate Status Chart
    // ----------------------------

    const statusCanvas =
        document.getElementById("statusChart");

    if (statusCanvas) {

        const applied =
            candidates.filter(
                candidate => candidate.status === "Applied"
            ).length;

        const shortlisted =
            candidates.filter(
                candidate => candidate.status === "Shortlisted"
            ).length;

        const interview =
            candidates.filter(
                candidate => candidate.status === "Interview"
            ).length;

        const selected =
            candidates.filter(
                candidate => candidate.status === "Selected"
            ).length;

        const rejected =
            candidates.filter(
                candidate => candidate.status === "Rejected"
            ).length;


        new Chart(statusCanvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Applied",
                    "Shortlisted",
                    "Interview",
                    "Selected",
                    "Rejected"
                ],

                datasets: [{

                    data: [
                        applied,
                        shortlisted,
                        interview,
                        selected,
                        rejected
                    ]

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        });

    }


    // ----------------------------
    // Candidates by Position
    // ----------------------------

    const positionCanvas =
        document.getElementById("positionChart");

    if (positionCanvas) {

        const positionCounts = {};


        candidates.forEach(candidate => {

            const position = candidate.position;

            if (positionCounts[position]) {

                positionCounts[position]++;

            } else {

                positionCounts[position] = 1;

            }

        });


        new Chart(positionCanvas, {

            type: "bar",

            data: {

                labels: Object.keys(positionCounts),

                datasets: [{

                    label: "Number of Candidates",

                    data: Object.values(positionCounts)

                }]

            },

            options: {

                responsive: true,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            stepSize: 1

                        }

                    }

                }

            }

        });

    }

}


// Create charts
if (typeof Chart !== "undefined") {
    createRecruitmentCharts();
}
    


// Update dashboard
updateDashboard();
// ================================
// RECENT CANDIDATES
// ================================

function displayRecentCandidates() {

    const tableBody =
        document.getElementById("recentCandidatesBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (candidates.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No candidates available
                </td>
            </tr>
        `;

        return;
    }

    // Show latest 5 candidates
    const recentCandidates =
        candidates.slice(-5).reverse();

    recentCandidates.forEach(candidate => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${candidate.id}</td>
            <td>${candidate.name}</td>
            <td>${candidate.position}</td>
            <td>${candidate.department}</td>
            <td>${candidate.status}</td>
        `;

        tableBody.appendChild(row);

    });
}

displayRecentCandidates();