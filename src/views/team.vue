<template>
  <div class="team">
    <div class="team_social"></div>
    <div class="team_dp">
      <img :src="image" alt="team" />
    </div>
    <div class="team_name">
      {{ name }}
    </div>
    <div class="team_designation">
      {{ designation }}
    </div>
  </div>
</template>
<script>
export default {
  props: { name: String, designation: String, image: String },
};
</script>

<style scoped>
.team {
  position: relative;
  height: 340px;
  width: 80%;
  border-radius: 8px;
  background-color: #9bc7bd;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 10px auto;
  max-width: 300px;
  background: #2b2b2b;
  border-top: 5px solid #333030;
}
.team:hover {
  box-shadow: 4px 8px 4px rgba(0, 81, 255, 0.274);
}
.team_dp {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 230px;
  width: 100%;
  border-radius: 8px 8px 0px 0;
  /* box-shadow: 0 0 5px rgb(0, 105, 153); */
  overflow: hidden;
}
.team_dp img {
  width: 100%;
  height: 100%;
  transition: 0.5s ease-in-out;
  border-radius: 8px 8px 0px 0;
}
.team_dp img:hover {
  transform: scale(1.2);
}
.team_name {
  position: absolute;
  bottom: 50px;
  color: rgb(44, 44, 44);
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 90%;
  margin: 0px 5%;
  text-align: center;
  border-bottom: 2px solid #00aeffc7;
  color: azure;
  transition: 0.3s ease-in-out;
}
.team_name:hover {
  letter-spacing: 3px;
}
.team_designation {
  position: absolute;
  bottom: 16px;
  color: rgb(44, 44, 44);
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 100%;
  text-align: center;
  color: azure;
}
@media screen and (max-width: 700px) {
  .team {
    width: 100%;
  }
}
</style>