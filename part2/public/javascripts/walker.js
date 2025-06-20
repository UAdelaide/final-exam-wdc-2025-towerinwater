const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const walks = ref([]);
        const message = ref('');
        const error = ref('');
        const cuid = ref(null);

        async function getCurrentUser() {
            await fetch('users/me', {
                credentials: 'include'
            })
            .then((res) => {
                res.json().then((info) => {
                    if(res.status === 401){
                        alert(info.error);
                        throw new Error(info.error);
                    }
                    else if(!res.ok){
                        alert(info.error);
                        throw new Error(info.error);
                    }

                    cuid.value = info.info;
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
                if (!cuid.value) {
                    throw new Error('Not logged in');
                }
                const res = await fetch(`/walker/${requestId}/apply`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ walker_id: cuid.value })
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
