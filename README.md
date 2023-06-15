# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# Layouts

## Using Vue Router, the route’s meta property, and dynamic components to create a layout system

- To avoid the layout from being unmounted and destroyed, we will put the layout above the page instead of within the page.
- We only imported the layouts once, we do not need to import or even wrap the layout in each page, and now, we will not have performance issues and we can keep state when navigating from 2 routes with the same layout.
- No need to wrap anything anymore; all is handled in App.vue around the `<router-view>` that represents each page when the route changes.
- **This method works in most use-cases, but it has 1 issue**: The layout only changes when the route changes.

##  Using ShallowRef, Provide, Inject and Vue Router’s afterEach hook to create a layout system

- There are only a few scenarios where you would want to change a layout dynamically but it could happen.

### Examples:
    - It could be to show a locked page after a certain period of time
    - It could be to show an offline page
    - It could be to show an error page

- **Those examples could be achieved with a fullscreen modal system, but a modal is easy to delete from the DOM via the console.**

- The next method will leverage Vue’s reactivity and provide/inject system.
- To be able to change the layout from anywhere and not just when the route changes, we need to share the layout’s state across the app.
- We could use Vuex or Pina for that, but let’s keep it simple here.
- We will use Vue’s native reactivity system with the composition api.

### Here are the steps:
    1. In App.vue, we will create a layout constant that contains a shallowRef to hold the current layout component

    2. In a separate file, we will create an object with key/value pairs that contains each layout’s name and it’s component

    3. In App.vue or elsewhere, we will listen to each route change with the router’s afterEach hook, to dynamically change the current layout

    4. In App.vue, we will provide the layout constant to it’s descendants, so that any component withing App.vue’s tree can inject the layout constant to change its value.

    5. In the routes, we will change each layout property on the meta to only a string containing the name of the layout to choose.


- Create a file called `layouts.js` :  the only file where we will import the layouts
    ```
    import BlankLayout from '@/views/Layouts/Blank.vue'
    import GuestLayout from '@/views/Layouts/Guest.vue'
    import AdminLayout from '@/views/Layouts/Admin.vue'

    export default {
        BlankLayout,
        GuestLayout,
        AdminLayout
    }
    ```
- Now we can also change the meta in the routes to only strings because they will be mapped to the object above:
    ```
    import { createRouter, createWebHistory } from 'vue-router'
    import About from '@/views/Guest/Pages/About.vue'
    import Home from '@/views/Guest/Pages/Home.vue'

    const routes = [
        {
            path: '/',
            meta: {layout: 'GuestLayout'},
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            meta: {layout: 'BlankLayout'},
            name: 'About',
            component: About
        },
    ]
    const router = createRouter({
        history: createWebHistory(),
        routes
    })

    export default router
    ```

- Now let’s glue all this together
- In `App.vue`
    ```
    <script setup>
    import { provide, shallowRef } from 'vue';
    import { router } from '@/router/index';
    import layouts from '@/views/Layouts/layouts';

    const layout = shallowRef('div')

    router.afterEach(() =>{
    layout.value = layouts[to.meta.layout] || 'div'
    });

    provide('app:layout', layout);

    </script>

    <template>
    
    <main>
        <component :is="layout || 'div'">
        <router-view />
        </component>
    </main>
    
    </template>

    ```
- App.vue using a dynamic component and providing the layout to it’s descendant
- Why do we use a shallowRef instead of a ref? : 
- **A ref will make reactive the base value and all the nested values, but a shallowRef only makes the base value reactive.**
- Since we are storing a component, which is a complex object with a lot of nested values, it causes performance issues to use a ref.

- It’s also unnecessary because we only need to know when the whole component has changed, not when a nested value has changed.

- **Now, how can we change the layout dynamically outside of the router you may ask? Well, anywhere!**

- Here’s an example of the Home that can change its layout with a click.

- `Home.vue` using `inject` to access the layout reactive state

    ```
    <script setup>
    import { inject } from 'vue';
    import layouts from '@/views/Layouts/layouts';

    const layout = inject('app:layout')
    const change = () => {
        layout.value =layouts.BlankLayout
    }
    </script>

    <template>
        <section class="home">
            <h1>Home</h1>

            <div class="box">
                <button class="button" @click="change">
                    Change Layout
                </button>
            </div>
        </section>

    </template>
    ```

- As you can see, we can now inject and access the layout’s state and change it to any component we want. Thanks to reactivity, it will dynamically change the component in App.vue.

- As said earlier, you could do the same with `Vuex` or `Pinia` for the shared state, but for most scenarios, this is enough.

## Reference 

- [Yes, here are 3 ways to create a multiple layout system with Vue 3](https://itnext.io/3-ways-to-create-a-multiple-layouts-system-vue-3-b24c0736b7bb)