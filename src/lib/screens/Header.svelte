<script>
  import { job } from '$lib/stores/gameStores'

</script>

<div class="readout">
  <div class='title'><strong>{$job.title}</strong> in <strong>{$job.department}</strong></div>
  <div class='years'>Years of Service: {$job.years}</div>
</div>

<style>
  .readout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid var(--text);
    width: 100%;
    text-align: center;
    padding-bottom: .3em;
    line-height: 1.1;
    font-size: .7em;
  }
  .title {
    text-align: left;
  }
  .years {
    text-align: right;
  }


</style>