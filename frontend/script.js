document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const list = document.getElementById('studentsList');

  const loadStudents = async () => {
    try {
      const res = await fetch('/students');
      const students = await res.json();
      list.innerHTML = students.map(s => `\n        <li>\n          <strong>${s.name}</strong> (${s.age}) — ${s.email} \n          <button class="deleteBtn" data-id="${s._id}">Delete</button>\n        </li>\n      `).join('');

      // attach delete handlers
      document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.target.dataset.id;
          await fetch(`/students/${id}`, { method: 'DELETE' });
          loadStudents();
        });
      });

    } catch (err) {
      console.error('Failed to load students', err);
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      age: Number(form.age.value),
      email: form.email.value
    };

    try {
      const res = await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        form.reset();
        loadStudents();
      } else {
        const err = await res.json();
        alert(err.message || 'Error creating student');
      }
    } catch (err) {
      console.error('Error creating student', err);
    }
  });

  loadStudents();
});