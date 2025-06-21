const { createApp } = Vue;
createApp({
    data() {
        return {
            message: 'Welcome to the Dog Of The Day Dashboard',
            /*Storing the login info of the user*/
            UserLogin: {
                username: '',
                password: ''
            },
            /*Store the data of the current user*/
            CurrUser: {
                uid: null,
                name: '',
                role: '',
                email: ''
            },
            /* Store all the data of the dog */
            imgURL: '',
            /* Default image when the dogs' images are not found */
            img_placeholder: 'images/logo.png'
        };
    },

    async mounted(){
        try{
            await fetch('https://dog.ceo/api/breeds/image/random')
            .then((res) => {
                res.json().then((info) => {
                    if(!res.ok){
                        alert(info.status);
                        throw new Error('Can not fetch image');
                    }
                    this.imgURL = info.message;
                    /* Log message make sure everything is working */
                    // alert(info.status);
                });
            });
        }
        catch{
            this.imgURL = img_placeholder;
        }
    },

    methods: {
        refresh(){
            window.location.reload();
        },
    }
}).mount('#app');