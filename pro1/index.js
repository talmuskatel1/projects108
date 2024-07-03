
    const checklist = [];

function renderList() {
    const mainList = document.getElementById('mainList');
    checklist.forEach((item, index) => {
        const mainItem = document.createElement('li');
        mainItem.className = 'list-group-item';
        mainItem.innerHTML = `
            <div>
                <input type="checkbox" id="check-${index}" ${item.checked ? 'checked' : ''}>
                <span id="title-${index}" contenteditable="true">${item.title}</span>
                <button class="btn btn-danger btn-sm float-right" onclick="deleteMainTitle(${index})">Delete</button>
            </div>
            <ul class="list-group mt-2"></ul>
            <input type="text" class="form-control mb-2" placeholder="Enter subitem" id="subitem-input-${index}">
            <button class="btn btn-secondary mb-2" onclick="addSubitem(${index})">Add Subitem</button>
        `;

        const sublist = mainItem.querySelector('ul');
        item.subitems.forEach(subitem => {
            const subItemElement = document.createElement('li');
            subItemElement.className = 'list-group-item';
            subItemElement.innerHTML = `<input type="checkbox" ${subitem.checked ? 'checked' : ''}> ${subitem.title}`;
            sublist.appendChild(subItemElement);
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
//פעולה שמוחקת איבר רצוי מהרשימה בשימוש בספלייס
function deleteMainTitle(index) {
    checklist.splice(index, 1);
    renderList();
}


