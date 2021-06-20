<template>
  <div class="bg-rose-100 w-40 md:w-60">
    <div class="w-full">
      <Disclosure
        v-for="{ title, items } in folder"
        :key="title"
        :defaultOpen="items && items.some(({ courseId }) => $route.params.courseId === String(courseId))"
        v-slot="{ open }"
      >
        <DisclosureButton class="flex justify-start items-center w-full px-4 pt-4 pb-3.5 hover:bg-rose-200 focus:outline-none">
          <ChevronRightIcon
            :class="open ? 'transform rotate-90' : ''"
            class="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-gray-700"
          />
          <div class="lg:text-lg text-gray-700 font-medium">{{ title }}</div>
        </DisclosureButton>
        <DisclosurePanel class="flex flex-col items-stretch">
          <router-link
            v-for="{ courseId, courseName } in items"
            :key="courseId"
            :to="`/browse/${courseId}`"
            :class="{ 'bg-rose-200': $route.params.courseId === String(courseId) }"
            class="pl-12 pt-3 pb-2.5 pr-1 text-gray-700 font-medium hover:bg-rose-200"
          >
            {{ courseName }}
          </router-link>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'

export default {
  name: 'Sidebar',
  components: { Disclosure, DisclosureButton, DisclosurePanel, ChevronRightIcon },
  props: ['folder'],
};
</script>
