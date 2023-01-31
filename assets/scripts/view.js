const entryCount = document.getElementById('entry-count');
const tableRow = document.querySelectorAll('.table-row');
const searchInput = document.getElementById('search');
const currentPagination = document.getElementById('current-pagination');
const nextButton = document.getElementById('next-pagination-btn');
const prevButton = document.getElementById('prev-pagination-btn');

let startCount = 0;

entryCount.onchange = showRowBasedOnCount;
searchInput.onkeydown = filterDataOnSearchKeyword;
nextButton.onclick = showRowBasedOnPagination;
prevButton.onclick = showRowBasedOnPagination;

function showRowBasedOnCount() {
    for (let i = 0; i < tableRow.length; i++) {
        if (i >= entryCount.value) {
            tableRow[i].style.display = 'none';
        } else {
            tableRow[i].style.display = 'table-row';
        }
    }
}
showRowBasedOnCount();

function filterDataOnSearchKeyword(e) {
    let searchedKeyword = e.target.value;
    if (searchedKeyword === '') {
        showRowBasedOnCount();
        return;
    }

    for (let i = 0; i < tableRow.length; i++) {
        if (tableRow[i].style.display !== 'none' && tableRow[i].textContent.includes(searchedKeyword)) {
            tableRow[i].style.display = 'table-row';
        } else {
            tableRow[i].style.display = 'none';
        }

    }
}

function showRowBasedOnPagination(e) {
    if (e.target.id === 'next-pagination-btn') {
        let updatedStartCount = Number(startCount) + Number(entryCount.value);

        if (updatedStartCount >= 0 && updatedStartCount < tableRow.length) {
            for (let i = startCount; i < tableRow.length; i++) {
                if (tableRow[i].style.display !== 'none') {
                    tableRow[i].style.display = 'none';
                }
            }

            for (let i = updatedStartCount; i < updatedStartCount + Number(entryCount.value); i++) {
                tableRow[i].style.display = 'table-row';
            }
            startCount = updatedStartCount;
            currentPagination.textContent = Number(currentPagination.textContent) + 1;
        }
    } else if (e.target.id === 'prev-pagination-btn') {

        let updatedStartCount = Number(startCount) - Number(entryCount.value);

        if (updatedStartCount >= 0 && updatedStartCount < tableRow.length) {
            for (let i = startCount; i < tableRow.length; i++) {
                if (tableRow[i].style.display !== 'none') {
                    tableRow[i].style.display = 'none';
                }
            }

            for (let i = updatedStartCount; i < updatedStartCount + Number(entryCount.value); i++) {
                tableRow[i].style.display = 'table-row';
            }
            startCount = updatedStartCount;
            currentPagination.textContent = Number(currentPagination.textContent) - 1;
        }
    }
}   