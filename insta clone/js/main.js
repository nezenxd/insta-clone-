const post_form = document.getElementById('post_add_form');
const msg = document.querySelector('.msg');
const all_posts = document.querySelector('.all-post');
const edit_post = document.getElementById('edit_post');
const comment_user = document.getElementById('comment-user');

post_form.onsubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    if (!data.aname || !data.aphoto || !data.pcontent || !data.pdate) {
        msg.innerHTML = 'Fields Are Required!';
    } else {
        const id = Date.now().toString();
        const dataObj = {...data, id};
        createLSData('ins_post', dataObj);
        e.target.reset();
        getAllPosts();
    }
};

const getAllPosts = () => {
    const post = getLSData('ins_post') || [];
    const copyPost = [...post];
    const list = copyPost.reverse().map((item) => {
        return `
        <div class="post">
            <div class="info">
              <div class="user">
                <div class="profile-pic">
                  <img src="${item.aphoto}" alt="">
                </div>
                <p class="username">${item.aname}</p>
              </div>
              <!-- Edit Delete -->
              <div class="dropdown">
                <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  <i class="fas fa-ellipsis-h"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a data-bs-toggle="modal" editLsData="${item.id}" data-bs-target="#edit-modal" class="dropdown-item post_edit" href="#">Edit</a></li>
                  <li><a class="dropdown-item post_delete" deleteLsData="${item.id}" href="#">Delete</a></li>
                </ul>
              </div>
            </div>
            <img src="${item.pphoto}" class="post-image" alt="">
            <div class="post-content">
              <div class="reaction-wrapper">
                <img src="heart.png" class="icon" alt="">
                <img src="insta commment.png" class="icon" alt="">
                <img src="send.png" class="icon" alt="">
                <img src="save insta.png" class="save icon" alt="">
              </div>
              <p class="likes">89 likes</p>
              <p class="description"><span>${item.aname}</span>${item.pcontent}</p>
              <p class="post-time">${item.pdate}</p>
            </div>
            <div class="comment-wrapper">
              <img src="img/smile.PNG" class="icon" alt="">
              <input type="text" class="comment-box" placeholder="Add a comment">
              <button class="comment-btn">Post</button>
            </div>
          </div>
        `;
    }).join('');

    all_posts.innerHTML = list || `<div class="card shadow-sm text-center mt-3"><div class="card-body">No post found</div></div>`;
};

getAllPosts();

all_posts.onclick = (e) => {
    if (e.target.hasAttribute('editLsData')) {
        const id = e.target.getAttribute('editLsData');
        const data = getLSData('ins_post');
        const singleData = data.find(item => item.id === id);
        edit_post.innerHTML = `
        <div class="my-3">
          <label for="">Author Name</label>
          <input name="aname" type="text" value="${singleData.aname}" class="form-control">
          <input name="id" value="${singleData.id}" type="hidden" />
        </div>
        <div class="my-3">
          <label for="">Author Profile Photo</label>
          <input name="aphoto" type="text" value="${singleData.aphoto}" class="form-control">
        </div>
        <div class="my-3">
          <label for="">Post Content</label>
          <textarea name="pcontent" class="form-control" placeholder="Write a caption...">${singleData.pcontent}</textarea>
        </div>
        <div class="my-3">
          <label for="">Post Photo</label>
          <input name="pphoto" type="text" value="${singleData.pphoto}" class="form-control">
        </div>
        <div class="my-3">
          <label for="">Please Mention Your Post Date</label>
          <input name="pdate" type="date" value="${singleData.pdate}" class="form-control">
        </div>
        <div class="my-3">
          <input type="submit" class="btn btn-primary w-100" value="Update Post">
        </div>
        `;
    }
    if (e.target.hasAttribute('deleteLsData')) {
        const id = e.target.getAttribute('deleteLsData');
        if (confirm('Are You Sure? You want to delete this post?')) {
            const data = getLSData('ins_post');
            const index = data.findIndex(item => item.id === id);
            data.splice(index, 1);
            updateLSData('ins_post', data);
            getAllPosts();
        }
    }
};

edit_post.onsubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const { aname, aphoto, pcontent, pdate, pphoto, id } = Object.fromEntries(form_data.entries());
    const post = getLSData('ins_post') || [];
    const index = post.findIndex(item => item.id === id);
    post[index] = { aname, aphoto, pcontent, pdate, pphoto, id };
    updateLSData('ins_post', post);
    getAllPosts();
};
