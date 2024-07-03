document.getElementById('addMainTitleButton').addEventListener('click', addMainTitle);

const checklist = [];

function renderList() {
    const mainList = document.getElementById('mainList');
    mainList.innerHTML = '';
    checklist.forEach((item, index) => {
        const mainItem = document.createElement('li');
        mainItem.className = 'list-group-item';
        mainItem.innerHTML = `
            <div>
                <input type="checkbox" id="check-${index}" ${item.checked ? 'checked' : ''}>
                <span id="title-${index}" contenteditable="true">${item.title}</span>
                <button class="btn btn-danger btn-sm float-right" onclick="deleteMainTitle(${index})">Delete</button>
            </div>
            <ul class="list-group mt-2" id="sublist-${index}"></ul>
            <input type="text" class="form-control mb-2" placeholder="Enter subitem" id="subitem-input-${index}">
            <button class="btn btn-secondary mb-2" onclick="addSubitem(${index})">Add Subitem</button>
        `;

        const sublist = mainItem.querySelector(`#sublist-${index}`);
        item.subitems.forEach((subitem, subindex) => {
            const subItemElement = document.createElement('li');
            subItemElement.className = 'list-group-item';
            subItemElement.innerHTML = `
                <input type="checkbox" id="subcheck-${index}-${subindex}" ${subitem.checked ? 'checked' : ''}>
                <span id="subtitle-${index}-${subindex}" contenteditable="true">${subitem.title}</span>
                <button class="btn btn-danger btn-sm float-right" onclick="deleteSub(${index}, ${subindex})">Delete</button>
            `;
            sublist.appendChild(subItemElement);

            subItemElement.querySelector(`#subtitle-${index}-${subindex}`).addEventListener('blur', (event) => {
                item.subitems[subindex].title = event.target.textContent;
            });

            subItemElement.querySelector(`#subcheck-${index}-${subindex}`).addEventListener('change', (event) => {
                item.subitems[subindex].checked = event.target.checked;
            });
        });

        mainList.appendChild(mainItem);

        mainItem.querySelector(`#title-${index}`).addEventListener('blur', (event) => {
            item.title = event.target.textContent;
        });

        mainItem.querySelector(`#check-${index}`).addEventListener('change', (event) => {
            item.checked = event.target.checked;
        });
    });
}

function addMainTitle() {
    const mainTitleInput = document.getElementById('mainTitleInput');
    const mainTitle = mainTitleInput.value.trim();
    if (mainTitle === '') {
        alert('Please enter a main title.');
        return;
    }

    checklist.push({ title: mainTitle, subitems: [], checked: false });
    renderList();
    mainTitleInput.value = '';
}

function addSubitem(index) {
    const subItemInput = document.getElementById(`subitem-input-${index}`);
    const subItemValue = subItemInput.value.trim();
    if (subItemValue === '') {
        alert('Please enter a subitem.');
        return;
    }

    checklist[index].subitems.push({ title: subItemValue, checked: false });
    renderList();
    subItemInput.value = '';
}
//מחיקה של כל הרשימה עם כל תתי הרשימות באמצעות ספלייס
function deleteMainTitle(index) {
    checklist.splice(index, 1);
    renderList();
}
//מחיקת תת-כותרת באמצעות ספלייס
function deleteSub(mainIndex, subIndex) {
    checklist[mainIndex].subitems.splice(subIndex, 1);
    renderList();
}
