<template>
  <AwesomeArticle aria-labelledby="user-detail-heading">
    <h1 id="user-detail-heading">
      {{ user?.name ?? `User #${route.params.id}` }}
    </h1>

    <div class="filters">
      <div class="filter-control">
        <label for="show-completed">Show completed</label>
        <input type="checkbox" id="show-completed" checked />
      </div>
      <div class="filter-control">
        <label for="show-pending">Show pending</label>
        <input type="checkbox" id="show-pending" checked />
      </div>
      <div class="filter-control">
        <label for="sort-order">Sort</label>
        <select id="sort-order" v-model="sortOrder">
          <option value="pending">Pending first</option>
          <option value="completed">Completed first</option>
        </select>
      </div>
      <div class="filter-control">
        <label for="check-all">Check all</label>
        <input type="checkbox" id="check-all" v-model="checkAll" />
      </div>
      <div class="filter-control">
        <label for="max-items">Limit</label>
        <select id="max-items" v-model="maxItems">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="">All</option>
        </select>
      </div>
    </div>
    <p v-if="todosPending">Loading todos…</p>
    <p v-else-if="todosError">Failed to load todos.</p>
    <ul v-else>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="todo.completed ? 'completed' : 'pending'"
      >
        <h4>{{ todo.title }}</h4>
        <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
      </li>
    </ul>
  </AwesomeArticle>
</template>

<script setup>
import { filteredTodos as applyFilters, getCheckAll, setCheckAll } from '~/utils/todo';

const route = useRoute();

const {
  data,
  error: todosError,
  pending: todosPending,
} = useAsyncData(`user-detail-${route.params.id}`, () =>
  $fetch(`/api/user/${route.params.id}`),
);

const user = computed(() => data.value?.user);
const todosData = computed(() => data.value?.todos ?? null);

const localTodos = ref(todosData.value?.map((t) => ({ ...t })) ?? []);
watch(todosData, (val) => {
  localTodos.value = val?.map((t) => ({ ...t })) ?? [];
});

const sortOrder = ref('pending');
const maxItems = ref('');

const filteredTodos = computed(() =>
  applyFilters(localTodos.value, sortOrder.value, maxItems.value),
);

const checkAll = computed({
  get() {
    return getCheckAll(localTodos.value);
  },
  set(newValue) {
    localTodos.value = setCheckAll(localTodos.value, newValue);
  },
});
</script>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.filter-control {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.filters:has(#show-completed:not(:checked)) ~ ul .completed {
  display: none;
}
.filters:has(#show-pending:not(:checked)) ~ ul .pending {
  display: none;
}
</style>
