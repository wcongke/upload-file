<template lang="pug">
  .upload-file
    h3 上传图片
    p
      span form参数
      br
      code {{ form }}
    p
      span img地址
      br
      code {{ img }}
    el-upload.uploader(
      drag
      action="//up.qbox.me/"
      v-bind:show-file-list="false"
      v-bind:data="form"
      v-bind:before-upload="handleBeforeUpload"
      v-bind:on-success="handleSuccess"
    )
      img.img(:src="img" v-if="img")
      div(v-else)
        i.el-icon-upload
        .el-upload__text 将图片拖拽至此
</template>

<script>
export default {
  data () {
    return {
      form: null,
      img: null
    }
  },
  methods: {
    /** @argument
     * 上传文件前处理
     * @param {file} file
     */
    handleBeforeUpload (file) {
      let params = {
        fileName: file.name
      }
      return this.axios.get('/api/upload', {params})
        .then((res) => {
          if (res.data.code === '1') {
            this.form = {
              key: res.data.result.fileName,
              token: res.data.result.uploadToken
            }
          } else {
            this.$message.error('上传图片失败')
          }
        })
        .catch(() => {
          this.$message.error('上传图片失败')
        })
    },
    /** @argument
     * 文件上传成功后处理
     * @param {Object} response
     * @param {file} file
     * @param {fileList}
     */
    handleSuccess (response, file, fileList) {
      this.img = `http://oconcdnvn.bkt.clouddn.com/${response.key}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-file
  .uploader
    .el-upload
      .el-upload-dragger
        min-height 180px
        height auto
    .img
      width 100%
</style>
