const { createApp, ref, onMounted } = Vue;
createApp({
    methods: {
        /* fetch to logout */
        logout(){
            fetch('/users/logout', {
                method: 'POST',
                credentials: 'include'
            })
            .then((res) => {
                res.json().then((response) => {
                    if(res.status === 200){
                        /* Bring user back to the log in page and prompt them a message. */
                        window.location.href = '/index.html';
                        alert(response.message);
                    }
                    else{
                        alert(res.json().error);
                    }
                });
            });
        }
    },

    mounted(){
        fetch('/owner/show_dogs', {
            method: 'POST',
            credentials: "include"
        })
        .then((res) => {
            res.json().then((info) => {
                if(res.status === 400){
                    alert(info.error);
                    throw new Error(info.error);
                }
                else if(!res.ok){
                    alert(info.error);
                    throw new Error(info.error);
                }

                info.forEach(name => {

                });
            });
        });
    },

    setup() {
        const form = ref({
            dog_id: '',
            requested_time: '',
            duration_minutes: '',
            location: ''
        });

        const walks = ref([]);
        const message = ref('');
        const error = ref('');

        async function loadWalks() {
            try {
                const res = await fetch('/api/walks');
                walks.value = await res.json();
            } catch (err) {
                error.value = 'Failed to load walk requests';
            }
        }

        async function submitWalkRequest() {
            try {
                const res = await fetch('/api/walks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form.value)
                });
                const result = await res.json();

                if (!res.ok) throw new Error(result.error || 'Error submitting walk request');

                message.value = result.message;
                error.value = '';
                form.value = {
                    dog_id: '',
                    requested_time: '',
                    duration_minutes: '',
                    location: ''
                };
                loadWalks();
            } catch (err) {
                error.value = err.message;
                message.value = '';
            }
        }

        onMounted(() => {
            loadWalks();
        });

        return {
            form,
            walks,
            message,
            error,
            submitWalkRequest
        };
    }
}).mount('#app');