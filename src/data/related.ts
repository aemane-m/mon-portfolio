// Liens croisés projet <-> articles (maillage interne, avec des textes de lien descriptifs).
export const projectArticles: Record<string, string[]> = {
  homelab: ["home-network-vlans-unifi", "proxmox-terraform-gitlab-ci", "kubernetes-talos-homelab", "backups-microserver-truenas-ilo"],
};
export const articleProject: Record<string, string> = {
  "home-network-vlans-unifi": "homelab",
  "proxmox-terraform-gitlab-ci": "homelab",
  "kubernetes-talos-homelab": "homelab",
  "backups-microserver-truenas-ilo": "homelab",
};
