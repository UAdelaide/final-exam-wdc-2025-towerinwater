const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const walks = ref([]);
        const message = ref('');
        const error = ref('');
        const cuid = ref(null);

        async function getCurrentUser() {
            /* call the get router userRouter */
            await fetch('users/me', {
                credentials: 'include'
            })
            .then((res) => {
                /* Successfully got the result and parse the json for result or log message */
                res.json().then((info) => {
                    if(res.status === 401){
                        alert(info.error);
                        throw new Error(info.error);
                    }
                    else if(!res.ok){
                        alert(info.error);
                        throw new Error(info.error);
                    }
                    /* Got the current user id */
                    cuid.value = info.info;
                    /* Log message make sure everything is working */
                    alert(info.message);
                });
            });
        }

        async function loadWalkRequests() {
            try {
                const res = await fetch('/walker');
                if (!res.ok) throw new Error('Failed to load walk requests');
                walks.value = await res.json();
            } catch (err) {
                error.value = err.message;
            }
        }

        async function applyToWalk(requestId) {
            try {
                const res = await fetch(`/walker/${requestId}/apply`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ walker_id: cuid.value }) /* use the new dynamic variable */
                });
                const result = await res.json();

                if (!res.ok) throw new Error(result.error || 'Application failed');
                message.value = result.message;
                error.value = '';
                await loadWalkRequests();
            } catch (err) {
                error.value = err.message;
                message.value = '';
            }
        }

        onMounted(() => {
            getCurrentUser();
            loadWalkRequests();
        });

        return {
            walks,
            message,
            error,
            applyToWalk
        };
    }
}).mount('#app');
