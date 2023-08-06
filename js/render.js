let activeNotes = [
  {
    id: 1,
    name: 'Creative Time',
    created: '2023-08-01',
    category: 'Personal',
    content: 'Sketch or paint for at least 45 minutes',
  },
  {
    id: 2,
    name: 'Call and Connect',
    created: '2023-08-02',
    category: 'Work',
    content: 'Review and respond to emails after lunch.',
  },
  {
    id: 3,
    name: 'Home Organization',
    created: '2023-08-03',
    category: 'Personal',
    content: 'Declutter the living room shelves.',
  },
  {
    id: 4,
    name: 'Work Tasks',
    created: '2023-08-04',
    category: 'Work',
    content: 'Schedule a meeting with the marketing team',
  },
  {
    id: 5,
    name: 'Personal Goals',
    created: '2023-08-05',
    category: 'Personal',
    content: 'Practice meditation for 15 minutes.',
  },
  {
    id: 6,
    name: 'Note 6',
    created: '2023-08-06',
    category: 'Work',
    content: 'This is the content of Note 6.',
  },
  {
    id: 7,
    name: 'Personal Goals',
    created: '2023-08-07',
    category: 'Sport',
    content: 'Go for a 30-minute jog in the morning.',
  },
];

let archivedNotes = [];
let categories = ['Work', 'Personal', 'Sport'];

const countElements = (arr, category) => {
  return arr.filter((note) => note.category === category).length;
};

function findDateInNoteContent(content) {
  let dataRegex = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g;
  let dates = content.match(dataRegex);
  if (dates) {
    return dates;
  } else {
    dates = [];
    return dates;
  }
}

showActiveNotesTable();
showInfoTable();

function showActiveNotesTable() {
  try {
    let bodyNoteTable = document.getElementById('body-note-table');
    bodyNoteTable.innerHTML = '';
    for (let note of activeNotes) {
      let tr = document.createElement('tr');
      tr.classList.add('table-light');

      let td1 = document.createElement('td');
      tr.appendChild(td1);

      let td2 = document.createElement('td');
      td2.textContent = note.name;
      tr.appendChild(td2);

      let td3 = document.createElement('td');
      let createdDate = new Date(note.created);
      td3.innerHTML = `${createdDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`;
      tr.appendChild(td3);

      let td4 = document.createElement('td');
      td4.textContent = note.category;
      tr.appendChild(td4);

      let td5 = document.createElement('td');
      td5.textContent = note.content;
      tr.appendChild(td5);

      let td6 = document.createElement('td');
      let dates = findDateInNoteContent(note.content);
      if (dates.length) {
        td6.textContent = dates.join('\r\n');
      } else {
        td6.innerHTML = '';
      }
      tr.appendChild(td6);

      let td7 = document.createElement('td');
      td7.innerHTML = `<i class="bi bi-pencil-fill"  onclick="updateNote('${note.id}')" ></i>`;
      tr.appendChild(td7);

      let td8 = document.createElement('td');
      td8.innerHTML = `<i class="bi bi-file-earmark-arrow-down-fill" id="archive-${note.id}" onclick="archiveNote(${note.id})"></i>`;
      tr.appendChild(td8);

      let td9 = document.createElement('td');
      td9.innerHTML = `<i class="bi bi-trash3-fill" id="delete-${note.id}" onclick="deleteNote(${note.id})"></i>`;
      tr.appendChild(td9);

      bodyNoteTable.appendChild(tr);
    }
  } catch (err) {
    alert(err.message);
  }
}

function showInfoTable() {
  try {
    let countActiveNoteIdea = countElements(activeNotes, 'Work');
    let countActiveNoteTask = countElements(activeNotes, 'Personal');
    let countActiveNoteRandomThought = countElements(activeNotes, 'Sport');
    let countArchiveNoteIdea = countElements(archivedNotes, 'Work');
    let countArchiveNoteTask = countElements(archivedNotes, 'Personal');
    let countArchiveNoteRandomThought = countElements(archivedNotes, 'Sport');

    let bodyInfoTable = document.getElementById('body-info-table');
    bodyInfoTable.innerHTML = '';
    for (let category of categories) {
      let tr = document.createElement('tr');
      tr.classList.add('table-light');

      let td1 = document.createElement('td');
      tr.appendChild(td1);

      let td2 = document.createElement('td');
      td2.textContent = category;
      tr.appendChild(td2);

      let td3 = document.createElement('td');
      let countActiveNotes;
      if (category === 'Work') {
        countActiveNotes = countActiveNoteIdea;
      } else if (category === 'Personal') {
        countActiveNotes = countActiveNoteTask;
      } else if (category === 'Sport') {
        countActiveNotes = countActiveNoteRandomThought;
      }
      td3.textContent = countActiveNotes;
      tr.appendChild(td3);

      let countArchiveNotes;
      if (category === 'Work') {
        countArchiveNotes = countArchiveNoteIdea;
      } else if (category === 'Personal') {
        countArchiveNotes = countArchiveNoteTask;
      } else if (category === 'Sport') {
        countArchiveNotes = countArchiveNoteRandomThought;
      }
      let td4 = document.createElement('td');
      td4.innerHTML = `${countArchiveNotes} &nbsp;  &nbsp;
    <button class="btn btn-secondary" type="button" >
    <i class="bi bi-archive" onclick="showArchivedNotesTable('${category}')"></i>
  </button>`;

      tr.appendChild(td4);

      bodyInfoTable.appendChild(tr);
    }
  } catch (err) {
    alert(err.message);
  }
}

const showArchivedNotesTable = (category) => {
  try {
    let archivedNotesTable = document.getElementById('archivedNotesTable');
    archivedNotesTable.classList.remove('collapse');
    let bodyArchivedNotesTable = document.getElementById(
      'body-archived-notes-table'
    );
    bodyArchivedNotesTable.innerHTML = '';
    archiveCategoryNotes = archivedNotes.filter(
      (note) => note.category == category
    );
    if (archiveCategoryNotes.length) {
      for (let note of archiveCategoryNotes) {
        let tr = document.createElement('tr');
        tr.classList.add('table-primary');

        let td1 = document.createElement('td');
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = note.name;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.textContent = note.created;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.textContent = note.category;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.textContent = note.content;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.textContent = note.dates;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.innerHTML = ` <i class="bi bi-file-earmark-arrow-up" onclick="unarchiveNote(${note.id})"></i>`;
        tr.appendChild(td7);

        let td8 = document.createElement('td');
        td8.innerHTML = '';
        tr.appendChild(td8);

        bodyArchivedNotesTable.appendChild(tr);
      }
    } else {
      let tr = document.createElement('tr');
      tr.classList.add('table-primary');

      let td = document.createElement('td');
      td.setAttribute('colspan', '8');
      td.textContent = ` archived note with category not founded "${category}"`;
      tr.appendChild(td);

      bodyArchivedNotesTable.appendChild(tr);
    }
  } catch (err) {
    alert(err.message);
  }
};
